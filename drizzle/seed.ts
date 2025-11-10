import { db } from '../src/lib/server/db/client';
import { initiatives, risks, teamMetrics, activityFeed } from '../src/lib/server/db/schema';
import * as dotenv from 'dotenv';

dotenv.config();

async function seed() {
	console.log('🌱 Seeding database...');

	try {
		// Clear existing data
		console.log('Clearing existing data...');
		await db.delete(activityFeed);
		await db.delete(risks);
		await db.delete(teamMetrics);
		await db.delete(initiatives);

		// Seed initiatives
		console.log('Creating initiatives...');
		const createdInitiatives = await db
			.insert(initiatives)
			.values([
				{
					name: 'Customer Portal Redesign',
					status: 'active',
					ragStatus: 'green',
					targetValue: '500000',
					deliveredValue: '350000',
					startDate: new Date('2024-01-15'),
					endDate: new Date('2025-03-31'),
					description: 'Complete overhaul of customer self-service portal with modern UX'
				},
				{
					name: 'Mobile App Launch',
					status: 'active',
					ragStatus: 'amber',
					targetValue: '1200000',
					deliveredValue: '450000',
					startDate: new Date('2024-06-01'),
					endDate: new Date('2025-06-30'),
					description: 'Native iOS and Android apps for core product features'
				},
				{
					name: 'AI-Powered Analytics',
					status: 'active',
					ragStatus: 'red',
					targetValue: '800000',
					deliveredValue: '120000',
					startDate: new Date('2024-09-01'),
					endDate: new Date('2025-09-30'),
					description: 'Machine learning models for predictive customer insights'
				},
				{
					name: 'API Platform Upgrade',
					status: 'planning',
					ragStatus: 'green',
					targetValue: '300000',
					deliveredValue: '0',
					startDate: new Date('2025-01-01'),
					endDate: new Date('2025-08-31'),
					description: 'Migrate to GraphQL and improve API documentation'
				},
				{
					name: 'Security Hardening',
					status: 'active',
					ragStatus: 'green',
					targetValue: '400000',
					deliveredValue: '280000',
					startDate: new Date('2024-03-01'),
					endDate: new Date('2025-03-31'),
					description: 'SOC 2 compliance and penetration testing remediation'
				},
				{
					name: 'Data Migration to Cloud',
					status: 'on-hold',
					ragStatus: 'amber',
					targetValue: '600000',
					deliveredValue: '150000',
					startDate: new Date('2024-04-01'),
					endDate: new Date('2025-12-31'),
					description: 'Migrate legacy on-prem databases to AWS RDS'
				},
				{
					name: 'International Expansion',
					status: 'completed',
					ragStatus: 'green',
					targetValue: '2000000',
					deliveredValue: '2100000',
					startDate: new Date('2023-06-01'),
					endDate: new Date('2024-12-31'),
					description: 'Localization and regional deployment for EMEA markets'
				}
			])
			.returning();

		console.log(`✅ Created ${createdInitiatives.length} initiatives`);

		// Seed risks
		console.log('Creating risks...');
		const createdRisks = await db
			.insert(risks)
			.values([
				{
					initiativeId: createdInitiatives[2].id, // AI-Powered Analytics
					title: 'ML Model Accuracy Below Target',
					description:
						'Current prediction accuracy is 68% but we need 85%+ for production release',
					severity: 'critical',
					status: 'identified',
					mitigationPlan: 'Engage external data science consultancy, expand training dataset'
				},
				{
					initiativeId: createdInitiatives[2].id, // AI-Powered Analytics
					title: 'Data Privacy Compliance Gap',
					description: 'GDPR requirements for AI/ML not fully addressed in current design',
					severity: 'high',
					status: 'mitigating',
					mitigationPlan: 'Legal review in progress, privacy-by-design workshop scheduled'
				},
				{
					initiativeId: createdInitiatives[1].id, // Mobile App Launch
					title: 'iOS App Store Review Delays',
					description: 'Previous submissions rejected twice, delaying launch timeline',
					severity: 'high',
					status: 'mitigating',
					mitigationPlan: 'Hired iOS consultant to ensure compliance with Apple guidelines'
				},
				{
					initiativeId: createdInitiatives[1].id, // Mobile App Launch
					title: 'Backend API Performance Issues',
					description: 'Mobile app load times exceed 3s on slow networks',
					severity: 'medium',
					status: 'identified',
					mitigationPlan: 'Performance optimization sprint scheduled for Q1'
				},
				{
					initiativeId: createdInitiatives[5].id, // Data Migration
					title: 'Legacy Data Quality Problems',
					description: 'Discovered inconsistencies in 15% of historical records',
					severity: 'medium',
					status: 'identified',
					mitigationPlan: 'Data cleansing automation scripts being developed'
				},
				{
					initiativeId: createdInitiatives[0].id, // Customer Portal
					title: 'Third-Party Integration Dependency',
					description: 'Waiting on partner API updates before final launch',
					severity: 'low',
					status: 'accepted',
					mitigationPlan: 'Graceful degradation implemented for missing features'
				}
			])
			.returning();

		console.log(`✅ Created ${createdRisks.length} risks`);

		// Seed team metrics
		console.log('Creating team metrics...');
		const createdMetrics = await db
			.insert(teamMetrics)
			.values([
				{
					metricDate: new Date('2024-11-01'),
					healthScore: 82,
					cycleTime: '12.5',
					velocity: 34,
					teamMorale: 78,
					notes: 'Strong sprint, team morale improved after successful release'
				},
				{
					metricDate: new Date('2024-10-15'),
					healthScore: 75,
					cycleTime: '14.2',
					velocity: 32,
					teamMorale: 72,
					notes: 'Some technical debt slowing velocity, planning cleanup sprint'
				},
				{
					metricDate: new Date('2024-10-01'),
					healthScore: 68,
					cycleTime: '16.8',
					velocity: 28,
					teamMorale: 65,
					notes: 'Team stretched thin, two key engineers on leave'
				},
				{
					metricDate: new Date('2024-09-15'),
					healthScore: 79,
					cycleTime: '13.1',
					velocity: 31,
					teamMorale: 75,
					notes: 'Good rhythm after completing major milestone'
				}
			])
			.returning();

		console.log(`✅ Created ${createdMetrics.length} team metrics`);

		// Seed activity feed
		console.log('Creating activity feed...');
		const createdActivity = await db
			.insert(activityFeed)
			.values([
				{
					activityType: 'status_changed',
					title: 'Customer Portal Redesign moved to Testing',
					description: 'All development complete, QA testing in progress',
					initiativeId: createdInitiatives[0].id,
					userId: 'user_123',
					createdAt: new Date(Date.now() - 1000 * 60 * 30) // 30 min ago
				},
				{
					activityType: 'risk_added',
					title: 'New risk identified: ML Model Accuracy Below Target',
					description: 'Critical risk added to AI-Powered Analytics initiative',
					initiativeId: createdInitiatives[2].id,
					userId: 'user_456',
					createdAt: new Date(Date.now() - 1000 * 60 * 120) // 2 hours ago
				},
				{
					activityType: 'milestone_reached',
					title: 'Mobile App Beta Released to TestFlight',
					description: '500 beta users now testing iOS app',
					initiativeId: createdInitiatives[1].id,
					userId: 'user_789',
					createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5) // 5 hours ago
				},
				{
					activityType: 'initiative_created',
					title: 'New initiative: API Platform Upgrade',
					description: 'Initiative created and moved to planning phase',
					initiativeId: createdInitiatives[3].id,
					userId: 'user_123',
					createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24) // 1 day ago
				},
				{
					activityType: 'status_changed',
					title: 'Security Hardening moved to 70% complete',
					description: 'SOC 2 audit passed, remaining items in progress',
					initiativeId: createdInitiatives[4].id,
					userId: 'user_456',
					createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2) // 2 days ago
				},
				{
					activityType: 'risk_added',
					title: 'Risk mitigated: iOS App Store Review Delays',
					description: 'Consultant onboarded, resubmission scheduled',
					initiativeId: createdInitiatives[1].id,
					userId: 'user_789',
					createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3) // 3 days ago
				},
				{
					activityType: 'status_changed',
					title: 'Data Migration to Cloud paused',
					description: 'Initiative on-hold pending budget approval',
					initiativeId: createdInitiatives[5].id,
					userId: 'user_123',
					createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5) // 5 days ago
				},
				{
					activityType: 'milestone_reached',
					title: 'International Expansion completed!',
					description: 'All EMEA regions now live, exceeded value targets by 5%',
					initiativeId: createdInitiatives[6].id,
					userId: 'user_456',
					createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7) // 7 days ago
				}
			])
			.returning();

		console.log(`✅ Created ${createdActivity.length} activity feed items`);

		console.log('\n🎉 Database seeded successfully!');
		console.log('\nSummary:');
		console.log(`  - ${createdInitiatives.length} initiatives`);
		console.log(`  - ${createdRisks.length} risks`);
		console.log(`  - ${createdMetrics.length} team metrics`);
		console.log(`  - ${createdActivity.length} activity feed items`);

		process.exit(0);
	} catch (error) {
		console.error('❌ Error seeding database:', error);
		process.exit(1);
	}
}

seed();
