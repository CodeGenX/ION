import { describe, it, expect, vi, beforeEach } from 'vitest';
import { dashboardRouter } from '../../../../src/lib/server/trpc/routers/dashboard';

// Mock database responses
const mockInitiatives = [
	{
		id: 1,
		name: 'Initiative 1',
		status: 'active',
		ragStatus: 'green',
		targetValue: '100000',
		deliveredValue: '50000'
	},
	{
		id: 2,
		name: 'Initiative 2',
		status: 'active',
		ragStatus: 'amber',
		targetValue: '200000',
		deliveredValue: '80000'
	},
	{
		id: 3,
		name: 'Initiative 3',
		status: 'completed',
		ragStatus: 'red',
		targetValue: '150000',
		deliveredValue: '30000'
	}
];

const mockRisks = [
	{ id: 1, title: 'Risk 1', description: 'Critical risk', severity: 'critical', initiativeId: 1, status: 'identified' },
	{ id: 2, title: 'Risk 2', description: 'High risk', severity: 'high', initiativeId: 2, status: 'identified' },
	{ id: 3, title: 'Risk 3', description: 'Medium risk', severity: 'medium', initiativeId: 1, status: 'identified' }
];

const mockTeamMetrics = [
	{
		id: 1,
		metricDate: new Date('2024-11-01'),
		healthScore: 85,
		cycleTime: '12.5',
		velocity: 32,
		teamMorale: 78
	}
];

const mockActivityFeed = [
	{
		id: 1,
		activityType: 'initiative_created',
		title: 'New initiative created',
		description: 'Test initiative',
		createdAt: new Date('2024-11-08')
	},
	{
		id: 2,
		activityType: 'status_changed',
		title: 'Status changed',
		description: 'From planning to active',
		createdAt: new Date('2024-11-07')
	}
];

// Create mock database
const createMockDb = () => ({
	select: vi.fn().mockReturnThis(),
	from: vi.fn().mockReturnThis(),
	where: vi.fn().mockReturnThis(),
	orderBy: vi.fn().mockReturnThis(),
	limit: vi.fn().mockReturnThis()
});

describe('Dashboard tRPC Router', () => {
	let mockDb: any;
	let mockCtx: any;

	beforeEach(() => {
		mockDb = createMockDb();
		mockCtx = { db: mockDb };
	});

	describe('getPortfolioHealth', () => {
		it('should return correct RAG breakdown', async () => {
			mockDb.select.mockReturnValue(mockDb);
			mockDb.from.mockResolvedValue(mockInitiatives);

			const caller = dashboardRouter.createCaller(mockCtx);
			const result = await caller.getPortfolioHealth();

			expect(result).toEqual({
				total: 3,
				red: 1,
				amber: 1,
				green: 1
			});
		});

		it('should handle empty initiatives', async () => {
			mockDb.select.mockReturnValue(mockDb);
			mockDb.from.mockResolvedValue([]);

			const caller = dashboardRouter.createCaller(mockCtx);
			const result = await caller.getPortfolioHealth();

			expect(result).toEqual({
				total: 0,
				red: 0,
				amber: 0,
				green: 0
			});
		});
	});

	describe('getValueDelivery', () => {
		it('should calculate total value delivery correctly', async () => {
			mockDb.select.mockReturnValue(mockDb);
			mockDb.from.mockResolvedValue([
				{
					totalTarget: '450000',
					totalDelivered: '160000'
				}
			]);

			const caller = dashboardRouter.createCaller(mockCtx);
			const result = await caller.getValueDelivery();

			expect(result.targetValue).toBe(450000);
			expect(result.deliveredValue).toBe(160000);
			expect(result.percentage).toBe(36); // (160000 / 450000) * 100 rounded
		});

		it('should handle zero target value', async () => {
			mockDb.select.mockReturnValue(mockDb);
			mockDb.from.mockResolvedValue([
				{
					totalTarget: '0',
					totalDelivered: '0'
				}
			]);

			const caller = dashboardRouter.createCaller(mockCtx);
			const result = await caller.getValueDelivery();

			expect(result.percentage).toBe(0);
		});
	});

	describe('getActiveInitiatives', () => {
		it('should return active initiatives with correct data', async () => {
			const activeInitiatives = mockInitiatives.filter((i) => i.status === 'active');

			mockDb.select.mockReturnValue(mockDb);
			mockDb.from.mockReturnValue(mockDb);
			mockDb.where.mockReturnValue(mockDb);
			mockDb.limit.mockResolvedValue(activeInitiatives);

			const caller = dashboardRouter.createCaller(mockCtx);
			const result = await caller.getActiveInitiatives();

			expect(result.count).toBe(2);
			expect(result.initiatives).toHaveLength(2);
			expect(result.initiatives[0]).toHaveProperty('name');
			expect(result.initiatives[0]).toHaveProperty('ragStatus');
		});

		it('should limit results to 5', async () => {
			mockDb.select.mockReturnValue(mockDb);
			mockDb.from.mockReturnValue(mockDb);
			mockDb.where.mockReturnValue(mockDb);
			mockDb.limit.mockResolvedValue([]);

			const caller = dashboardRouter.createCaller(mockCtx);
			await caller.getActiveInitiatives();

			expect(mockDb.limit).toHaveBeenCalledWith(5);
		});
	});

	describe('getTeamHealth', () => {
		it('should return latest team metrics with correct status', async () => {
			mockDb.select.mockReturnValue(mockDb);
			mockDb.from.mockReturnValue(mockDb);
			mockDb.orderBy.mockReturnValue(mockDb);
			mockDb.limit.mockResolvedValue(mockTeamMetrics);

			const caller = dashboardRouter.createCaller(mockCtx);
			const result = await caller.getTeamHealth();

			expect(result.healthScore).toBe(85);
			expect(result.cycleTime).toBe(12.5);
			expect(result.velocity).toBe(32);
			expect(result.status).toBe('green'); // healthScore >= 75
		});

		it('should return amber status for health score between 50-75', async () => {
			mockDb.select.mockReturnValue(mockDb);
			mockDb.from.mockReturnValue(mockDb);
			mockDb.orderBy.mockReturnValue(mockDb);
			mockDb.limit.mockResolvedValue([
				{ ...mockTeamMetrics[0], healthScore: 65 }
			]);

			const caller = dashboardRouter.createCaller(mockCtx);
			const result = await caller.getTeamHealth();

			expect(result.status).toBe('amber');
		});

		it('should return red status for health score below 50', async () => {
			mockDb.select.mockReturnValue(mockDb);
			mockDb.from.mockReturnValue(mockDb);
			mockDb.orderBy.mockReturnValue(mockDb);
			mockDb.limit.mockResolvedValue([
				{ ...mockTeamMetrics[0], healthScore: 45 }
			]);

			const caller = dashboardRouter.createCaller(mockCtx);
			const result = await caller.getTeamHealth();

			expect(result.status).toBe('red');
		});

		it('should handle no metrics data', async () => {
			mockDb.select.mockReturnValue(mockDb);
			mockDb.from.mockReturnValue(mockDb);
			mockDb.orderBy.mockReturnValue(mockDb);
			mockDb.limit.mockResolvedValue([]);

			const caller = dashboardRouter.createCaller(mockCtx);
			const result = await caller.getTeamHealth();

			expect(result.healthScore).toBe(0);
			expect(result.status).toBe('No data available');
		});
	});

	describe('getRisks', () => {
		it('should return risks sorted by severity', async () => {
			mockDb.select.mockReturnValue(mockDb);
			mockDb.from.mockReturnValue(mockDb);
			mockDb.where.mockReturnValue(mockDb);
			mockDb.limit.mockResolvedValue(mockRisks);

			const caller = dashboardRouter.createCaller(mockCtx);
			const result = await caller.getRisks();

			expect(result).toHaveLength(3);
			expect(result[0].severity).toBe('critical');
			expect(result[1].severity).toBe('high');
			expect(result[2].severity).toBe('medium');
		});

		it('should limit results to 5', async () => {
			mockDb.select.mockReturnValue(mockDb);
			mockDb.from.mockReturnValue(mockDb);
			mockDb.where.mockReturnValue(mockDb);
			mockDb.limit.mockResolvedValue([]);

			const caller = dashboardRouter.createCaller(mockCtx);
			await caller.getRisks();

			expect(mockDb.limit).toHaveBeenCalledWith(5);
		});
	});

	describe('getRecentActivity', () => {
		it('should return recent activity items', async () => {
			mockDb.select.mockReturnValue(mockDb);
			mockDb.from.mockReturnValue(mockDb);
			mockDb.orderBy.mockReturnValue(mockDb);
			mockDb.limit.mockResolvedValue(mockActivityFeed);

			const caller = dashboardRouter.createCaller(mockCtx);
			const result = await caller.getRecentActivity();

			expect(result).toHaveLength(2);
			expect(result[0]).toHaveProperty('activityType');
			expect(result[0]).toHaveProperty('title');
			expect(result[0]).toHaveProperty('createdAt');
		});

		it('should limit results to 10', async () => {
			mockDb.select.mockReturnValue(mockDb);
			mockDb.from.mockReturnValue(mockDb);
			mockDb.orderBy.mockReturnValue(mockDb);
			mockDb.limit.mockResolvedValue([]);

			const caller = dashboardRouter.createCaller(mockCtx);
			await caller.getRecentActivity();

			expect(mockDb.limit).toHaveBeenCalledWith(10);
		});
	});
});
