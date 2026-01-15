/**
 * Revenue Tracking Service
 * 
 * Tracks company revenue and calculates budget scaling factors
 */

import axios from 'axios';

interface RevenueData {
  totalMRR: number;
  revenueByProduct: {
    dealio: number;
    quotely: number;
    shopflow: number;
    shoplink: number;
  };
  oneTimeRevenue: number;
  totalRevenue: number;
}

interface BudgetLimits {
  ceo: {
    maxSpending: number;
  };
  cfo: {
    maxCostOptimization: number;
    maxBudgetAllocation: number;
  };
  cto: {
    maxInfrastructureCost: number;
  };
}

export class RevenueTracker {
  private baseRevenue = 1000; // $1,000 MRR = 1x scale
  private maxScaleFactor = 10; // Maximum 10x scaling
  private minScaleFactor = 1; // Never go below base

  // Base budgets (starting point)
  private baseBudgets = {
    ceo: { maxSpending: 300 },
    cfo: { maxCostOptimization: 150, maxBudgetAllocation: 300 },
    cto: { maxInfrastructureCost: 150 },
  };

  /**
   * Calculate scale factor based on monthly revenue
   */
  calculateScaleFactor(monthlyRevenue: number): number {
    const scaleFactor = monthlyRevenue / this.baseRevenue;
    
    // Cap at maximum
    if (scaleFactor > this.maxScaleFactor) {
      return this.maxScaleFactor;
    }
    
    // Never go below minimum
    if (scaleFactor < this.minScaleFactor) {
      return this.minScaleFactor;
    }
    
    return scaleFactor;
  }

  /**
   * Calculate adjusted budget limits based on revenue
   */
  calculateBudgetLimits(monthlyRevenue: number): BudgetLimits {
    const scaleFactor = this.calculateScaleFactor(monthlyRevenue);
    
    return {
      ceo: {
        maxSpending: Math.round(this.baseBudgets.ceo.maxSpending * scaleFactor),
      },
      cfo: {
        maxCostOptimization: Math.round(this.baseBudgets.cfo.maxCostOptimization * scaleFactor),
        maxBudgetAllocation: Math.round(this.baseBudgets.cfo.maxBudgetAllocation * scaleFactor),
      },
      cto: {
        maxInfrastructureCost: Math.round(this.baseBudgets.cto.maxInfrastructureCost * scaleFactor),
      },
    };
  }

  /**
   * Fetch revenue data from Super Admin analytics
   */
  async fetchRevenueData(superAdminUrl?: string): Promise<RevenueData> {
    // Default to Super Admin URL if not provided
    const url = superAdminUrl || process.env.SUPER_ADMIN_URL || 'https://super-admin.doublevision.company';
    
    try {
      const response = await axios.get(`${url}/api/analytics`, {
        timeout: 10000,
        validateStatus: () => true,
      });

      if (response.status !== 200) {
        throw new Error(`Failed to fetch analytics: ${response.status}`);
      }

      const analytics = response.data;
      const financial = analytics.financial || {};

      // Calculate MRR from financial metrics
      const totalMRR = financial.mrr || 0;
      const revenueByProduct = {
        dealio: financial.dealioMRR || 0,
        quotely: financial.quotelyMRR || 0,
        shopflow: financial.shopflowMRR || 0,
        shoplink: financial.shoplinkMRR || 0,
      };
      const oneTimeRevenue = financial.oneTimeRevenue || 0;
      const totalRevenue = totalMRR + oneTimeRevenue;

      return {
        totalMRR,
        revenueByProduct,
        oneTimeRevenue,
        totalRevenue,
      };
    } catch (error: any) {
      console.error('Error fetching revenue data:', error.message);
      
      // Return zero revenue if fetch fails (conservative approach)
      return {
        totalMRR: 0,
        revenueByProduct: {
          dealio: 0,
          quotely: 0,
          shopflow: 0,
          shoplink: 0,
        },
        oneTimeRevenue: 0,
        totalRevenue: 0,
      };
    }
  }

  /**
   * Generate monthly revenue report
   */
  async generateRevenueReport(): Promise<{
    revenue: RevenueData;
    scaleFactor: number;
    budgets: BudgetLimits;
    recommendations: string[];
  }> {
    const revenue = await this.fetchRevenueData();
    const scaleFactor = this.calculateScaleFactor(revenue.totalMRR);
    const budgets = this.calculateBudgetLimits(revenue.totalMRR);

    const recommendations: string[] = [];

    if (revenue.totalMRR < this.baseRevenue) {
      recommendations.push('Revenue below base threshold. Maintain conservative budgets.');
      recommendations.push('Focus on revenue-generating activities.');
    } else if (scaleFactor >= this.maxScaleFactor) {
      recommendations.push('Revenue at maximum scaling threshold. Budgets capped at 10x.');
      recommendations.push('Consider strategic investments beyond base scaling.');
    } else {
      const nextMilestone = Math.ceil(revenue.totalMRR / 1000) * 1000;
      recommendations.push(`Current scale: ${scaleFactor.toFixed(1)}x. Next milestone: $${nextMilestone.toLocaleString()} MRR for ${(nextMilestone / this.baseRevenue).toFixed(1)}x scaling.`);
    }

    return {
      revenue,
      scaleFactor,
      budgets,
      recommendations,
    };
  }
}

export default RevenueTracker;

