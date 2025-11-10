import { pgTable, serial, text, integer, timestamp, numeric, index } from 'drizzle-orm/pg-core';

// Initiatives table - Core portfolio initiatives
export const initiatives = pgTable(
	'initiatives',
	{
		id: serial('id').primaryKey(),
		name: text('name').notNull(),
		status: text('status').notNull(), // 'planning' | 'active' | 'on-hold' | 'completed'
		ragStatus: text('rag_status').notNull(), // 'red' | 'amber' | 'green'
		targetValue: numeric('target_value', { precision: 10, scale: 2 }),
		deliveredValue: numeric('delivered_value', { precision: 10, scale: 2 }).default('0'),
		startDate: timestamp('start_date'),
		endDate: timestamp('end_date'),
		description: text('description'),
		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at').defaultNow().notNull()
	},
	(table) => ({
		ragStatusIdx: index('initiatives_rag_status_idx').on(table.ragStatus),
		statusIdx: index('initiatives_status_idx').on(table.status)
	})
);

// Risks table - Portfolio risk indicators
export const risks = pgTable(
	'risks',
	{
		id: serial('id').primaryKey(),
		initiativeId: integer('initiative_id').references(() => initiatives.id),
		title: text('title').notNull(),
		description: text('description'),
		severity: text('severity').notNull(), // 'critical' | 'high' | 'medium' | 'low'
		status: text('status').notNull().default('identified'), // 'identified' | 'mitigating' | 'resolved' | 'accepted'
		mitigationPlan: text('mitigation_plan'),
		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at').defaultNow().notNull()
	},
	(table) => ({
		initiativeIdx: index('risks_initiative_idx').on(table.initiativeId),
		severityIdx: index('risks_severity_idx').on(table.severity)
	})
);

// Team Metrics table - Team health and performance data
export const teamMetrics = pgTable('team_metrics', {
	id: serial('id').primaryKey(),
	metricDate: timestamp('metric_date').notNull(),
	healthScore: integer('health_score').notNull(), // 0-100 scale
	cycleTime: numeric('cycle_time', { precision: 5, scale: 2 }), // Average cycle time in days
	velocity: integer('velocity'), // Story points per sprint
	teamMorale: integer('team_morale'), // 0-100 scale
	notes: text('notes'),
	createdAt: timestamp('created_at').defaultNow().notNull()
});

// Activity Feed table - Recent updates and activity log
export const activityFeed = pgTable(
	'activity_feed',
	{
		id: serial('id').primaryKey(),
		activityType: text('activity_type').notNull(), // 'initiative_created' | 'risk_added' | 'status_changed' | 'milestone_reached'
		title: text('title').notNull(),
		description: text('description'),
		initiativeId: integer('initiative_id').references(() => initiatives.id),
		userId: text('user_id'), // Future: link to users table
		metadata: text('metadata'), // JSON string for additional data
		createdAt: timestamp('created_at').defaultNow().notNull()
	},
	(table) => ({
		createdAtIdx: index('activity_feed_created_idx').on(table.createdAt),
		initiativeIdx: index('activity_feed_initiative_idx').on(table.initiativeId)
	})
);

// Export types for use in application
export type Initiative = typeof initiatives.$inferSelect;
export type NewInitiative = typeof initiatives.$inferInsert;

export type Risk = typeof risks.$inferSelect;
export type NewRisk = typeof risks.$inferInsert;

export type TeamMetric = typeof teamMetrics.$inferSelect;
export type NewTeamMetric = typeof teamMetrics.$inferInsert;

export type ActivityFeedItem = typeof activityFeed.$inferSelect;
export type NewActivityFeedItem = typeof activityFeed.$inferInsert;
