import { router, publicProcedure } from '../t';
import { initiatives, risks, teamMetrics, activityFeed } from '../../db/schema';
import { desc, eq, sql } from 'drizzle-orm';

export const dashboardRouter = router({
	// Procedure 1: Get Portfolio Health (RAG breakdown)
	getPortfolioHealth: publicProcedure.query(async ({ ctx }) => {
		const allInitiatives = await ctx.db.select().from(initiatives);

		return {
			total: allInitiatives.length,
			red: allInitiatives.filter((i) => i.ragStatus === 'red').length,
			amber: allInitiatives.filter((i) => i.ragStatus === 'amber').length,
			green: allInitiatives.filter((i) => i.ragStatus === 'green').length
		};
	}),

	// Procedure 2: Get Value Delivery (delivered vs. target value)
	getValueDelivery: publicProcedure.query(async ({ ctx }) => {
		const result = await ctx.db
			.select({
				totalTarget: sql<string>`SUM(CAST(${initiatives.targetValue} AS DECIMAL))`,
				totalDelivered: sql<string>`SUM(CAST(${initiatives.deliveredValue} AS DECIMAL))`
			})
			.from(initiatives);

		const targetValue = parseFloat(result[0]?.totalTarget || '0');
		const deliveredValue = parseFloat(result[0]?.totalDelivered || '0');
		const percentage = targetValue > 0 ? Math.round((deliveredValue / targetValue) * 100) : 0;

		return {
			targetValue,
			deliveredValue,
			percentage
		};
	}),

	// Procedure 3: Get Active Initiatives (count + list with RAG status)
	getActiveInitiatives: publicProcedure.query(async ({ ctx }) => {
		const activeInitiatives = await ctx.db
			.select()
			.from(initiatives)
			.where(eq(initiatives.status, 'active'))
			.limit(5);

		return {
			count: activeInitiatives.length,
			initiatives: activeInitiatives.map((i) => ({
				id: i.id,
				name: i.name,
				ragStatus: i.ragStatus,
				deliveredValue: parseFloat(i.deliveredValue || '0'),
				targetValue: parseFloat(i.targetValue || '0')
			}))
		};
	}),

	// Procedure 4: Get Team Health (health score, cycle time, velocity)
	getTeamHealth: publicProcedure.query(async ({ ctx }) => {
		const latestMetric = await ctx.db
			.select()
			.from(teamMetrics)
			.orderBy(desc(teamMetrics.metricDate))
			.limit(1);

		if (latestMetric.length === 0) {
			return {
				healthScore: 0,
				cycleTime: 0,
				velocity: 0,
				status: 'No data available'
			};
		}

		const metric = latestMetric[0];
		const healthScore = metric.healthScore;

		// Determine status color based on health score
		let status: string;
		if (healthScore >= 75) {
			status = 'green';
		} else if (healthScore >= 50) {
			status = 'amber';
		} else {
			status = 'red';
		}

		return {
			healthScore,
			cycleTime: parseFloat(metric.cycleTime || '0'),
			velocity: metric.velocity || 0,
			status
		};
	}),

	// Procedure 5: Get Risks (top 5 risks sorted by severity)
	getRisks: publicProcedure.query(async ({ ctx }) => {
		const identifiedRisks = await ctx.db
			.select({
				id: risks.id,
				title: risks.title,
				description: risks.description,
				severity: risks.severity,
				initiativeId: risks.initiativeId
			})
			.from(risks)
			.where(eq(risks.status, 'identified'))
			.limit(5);

		// Sort by severity: critical > high > medium > low
		const severityOrder: Record<string, number> = {
			critical: 0,
			high: 1,
			medium: 2,
			low: 3
		};

		const sortedRisks = identifiedRisks.sort(
			(a, b) => severityOrder[a.severity] - severityOrder[b.severity]
		);

		return sortedRisks;
	}),

	// Procedure 6: Get Recent Activity (last 10 activity feed items)
	getRecentActivity: publicProcedure.query(async ({ ctx }) => {
		const recentActivity = await ctx.db
			.select()
			.from(activityFeed)
			.orderBy(desc(activityFeed.createdAt))
			.limit(10);

		return recentActivity.map((item) => ({
			id: item.id,
			activityType: item.activityType,
			title: item.title,
			description: item.description,
			createdAt: item.createdAt
		}));
	})
});
