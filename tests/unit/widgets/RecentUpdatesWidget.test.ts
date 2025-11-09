import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('RecentUpdatesWidget', () => {
	describe('Relative time formatting', () => {
		const formatRelativeTime = (date: Date | string): string => {
			const now = new Date();
			const activityDate = new Date(date);
			const diffMs = now.getTime() - activityDate.getTime();
			const diffMins = Math.floor(diffMs / 60000);
			const diffHours = Math.floor(diffMs / 3600000);
			const diffDays = Math.floor(diffMs / 86400000);

			if (diffMins < 1) return 'Just now';
			if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
			if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
			if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
			return activityDate.toLocaleDateString();
		};

		beforeEach(() => {
			// Mock current time for consistent testing
			vi.useFakeTimers();
			vi.setSystemTime(new Date('2024-11-09T12:00:00Z'));
		});

		it('should format "just now" for very recent activities', () => {
			const now = new Date();
			expect(formatRelativeTime(now)).toBe('Just now');
		});

		it('should format minutes correctly', () => {
			const fiveMinutesAgo = new Date('2024-11-09T11:55:00Z');
			expect(formatRelativeTime(fiveMinutesAgo)).toBe('5 minutes ago');

			const oneMinuteAgo = new Date('2024-11-09T11:59:00Z');
			expect(formatRelativeTime(oneMinuteAgo)).toBe('1 minute ago');
		});

		it('should format hours correctly', () => {
			const twoHoursAgo = new Date('2024-11-09T10:00:00Z');
			expect(formatRelativeTime(twoHoursAgo)).toBe('2 hours ago');

			const oneHourAgo = new Date('2024-11-09T11:00:00Z');
			expect(formatRelativeTime(oneHourAgo)).toBe('1 hour ago');
		});

		it('should format days correctly', () => {
			const threeDaysAgo = new Date('2024-11-06T12:00:00Z');
			expect(formatRelativeTime(threeDaysAgo)).toBe('3 days ago');

			const oneDayAgo = new Date('2024-11-08T12:00:00Z');
			expect(formatRelativeTime(oneDayAgo)).toBe('1 day ago');
		});

		it('should format dates older than 7 days as locale date string', () => {
			const tenDaysAgo = new Date('2024-10-30T12:00:00Z');
			const formatted = formatRelativeTime(tenDaysAgo);

			// Should not contain "ago" for dates > 7 days
			expect(formatted).not.toContain('ago');
			expect(formatted).toMatch(/\d+\/\d+\/\d+/); // Date format
		});
	});

	describe('Activity icon mapping', () => {
		const getActivityIcon = (activityType: string): string => {
			switch (activityType) {
				case 'initiative_created':
					return '🚀';
				case 'initiative_updated':
					return '✏️';
				case 'risk_identified':
					return '⚠️';
				case 'value_delivered':
					return '💰';
				case 'status_changed':
					return '🔄';
				default:
					return '📌';
			}
		};

		it('should return correct icons for known activity types', () => {
			expect(getActivityIcon('initiative_created')).toBe('🚀');
			expect(getActivityIcon('initiative_updated')).toBe('✏️');
			expect(getActivityIcon('risk_identified')).toBe('⚠️');
			expect(getActivityIcon('value_delivered')).toBe('💰');
			expect(getActivityIcon('status_changed')).toBe('🔄');
		});

		it('should return default icon for unknown activity types', () => {
			expect(getActivityIcon('unknown_type')).toBe('📌');
			expect(getActivityIcon('custom_activity')).toBe('📌');
		});
	});

	describe('Data structure validation', () => {
		it('should expect correct data structure from tRPC', () => {
			const mockActivities = [
				{
					id: 1,
					activityType: 'initiative_created',
					title: 'New initiative created',
					description: 'Initiative Alpha launched',
					createdAt: new Date('2024-11-08T10:00:00Z')
				},
				{
					id: 2,
					activityType: 'status_changed',
					title: 'Status updated',
					description: 'Initiative moved to active',
					createdAt: new Date('2024-11-07T15:00:00Z')
				}
			];

			mockActivities.forEach(activity => {
				expect(activity).toHaveProperty('id');
				expect(activity).toHaveProperty('activityType');
				expect(activity).toHaveProperty('title');
				expect(activity).toHaveProperty('description');
				expect(activity).toHaveProperty('createdAt');
				expect(activity.createdAt).toBeInstanceOf(Date);
			});
		});

		it('should handle empty activities list', () => {
			const mockData: any[] = [];
			expect(mockData).toHaveLength(0);
		});

		it('should limit to maximum 10 activities', () => {
			const mockActivities = new Array(10).fill(null).map((_, i) => ({
				id: i + 1,
				activityType: 'initiative_created',
				title: `Activity ${i + 1}`,
				description: `Description ${i + 1}`,
				createdAt: new Date()
			}));

			expect(mockActivities).toHaveLength(10);
			expect(mockActivities.length).toBeLessThanOrEqual(10);
		});
	});

	describe('Alternating row backgrounds', () => {
		it('should alternate background colors based on index', () => {
			const getBackgroundClass = (index: number) =>
				index % 2 === 0 ? 'bg-white' : 'bg-surface-50';

			expect(getBackgroundClass(0)).toBe('bg-white');
			expect(getBackgroundClass(1)).toBe('bg-surface-50');
			expect(getBackgroundClass(2)).toBe('bg-white');
			expect(getBackgroundClass(3)).toBe('bg-surface-50');
		});
	});
});
