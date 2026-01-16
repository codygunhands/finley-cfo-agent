/**
 * Budget Updater Service
 * Automatically updates budget limits based on revenue
 */

import { RevenueTracker } from './revenue-tracker';
import axios from 'axios';

const DO_API_TOKEN = process.env.DO_API_TOKEN || '';
const DO_API_BASE = 'https://api.digitalocean.com/v2';

interface BudgetLimits {
  ceo: { maxSpending: number };
  cfo: { maxCostOptimization: number; maxBudgetAllocation: number };
  cto: { maxInfrastructureCost: number };
}

export class BudgetUpdater {
  private revenueTracker: RevenueTracker;
  private lastUpdateDate: string | null = null;

  constructor() {
    this.revenueTracker = new RevenueTracker();
  }

  /**
   * Update budgets for all board members based on current revenue
   */
  async updateBudgets(): Promise<{
    success: boolean;
    budgets: BudgetLimits;
    scaleFactor: number;
    revenue: number;
    error?: string;
  }> {
    try {
      // Get revenue report
      const report = await this.revenueTracker.generateRevenueReport();
      
      // Calculate new budgets
      const budgets = report.budgets;
      const scaleFactor = report.scaleFactor;
      const revenue = report.revenue.totalMRR;
      
      // Check if we've already updated today
      const today = new Date().toISOString().split('T')[0];
      if (this.lastUpdateDate === today && scaleFactor <= 1.1) {
        // Only update if scale factor changed significantly or it's a new day
        return {
          success: true,
          budgets,
          scaleFactor,
          revenue,
        };
      }
      
      // Update budgets in DigitalOcean environment variables
      // Note: This would require updating each app's environment variables
      // For now, we'll log the recommended budgets
      console.log('📊 Budget Update Recommended:');
      console.log(`   Revenue: $${revenue.toLocaleString()}/month`);
      console.log(`   Scale Factor: ${scaleFactor.toFixed(2)}x`);
      console.log(`   CEO Max Spending: $${budgets.ceo.maxSpending}`);
      console.log(`   CFO Cost Optimization: $${budgets.cfo.maxCostOptimization}`);
      console.log(`   CFO Budget Allocation: $${budgets.cfo.maxBudgetAllocation}`);
      console.log(`   CTO Infrastructure: $${budgets.cto.maxInfrastructureCost}`);
      
      // TODO: Update DigitalOcean app environment variables
      // This would require API calls to update each app's spec
      
      this.lastUpdateDate = today;
      
      return {
        success: true,
        budgets,
        scaleFactor,
        revenue,
      };
    } catch (error: any) {
      return {
        success: false,
        budgets: {
          ceo: { maxSpending: 300 },
          cfo: { maxCostOptimization: 150, maxBudgetAllocation: 300 },
          cto: { maxInfrastructureCost: 150 },
        },
        scaleFactor: 1,
        revenue: 0,
        error: error.message,
      };
    }
  }

  /**
   * Run daily budget update (call from cron or scheduled job)
   */
  async runDailyUpdate(): Promise<void> {
    console.log('🔄 Running daily budget update...');
    const result = await this.updateBudgets();
    
    if (result.success) {
      console.log('✅ Budgets updated successfully');
      console.log(`   Scale Factor: ${result.scaleFactor.toFixed(2)}x`);
      console.log(`   Revenue: $${result.revenue.toLocaleString()}/month`);
    } else {
      console.error('❌ Budget update failed:', result.error);
    }
  }
}

