# Revenue Tracking and Budget Scaling

## Overview

As CFO, you are responsible for tracking company revenue and dynamically scaling budget limits as income grows. This ensures we start conservatively and scale responsibly.

---

## Revenue Sources

### Primary Revenue Streams

1. **Dealio Subscriptions**
   - Monthly recurring revenue (MRR)
   - Transaction fees
   - Track via Stripe API

2. **Quotely Premium**
   - One-time purchases
   - Monthly subscriptions
   - Track via Stripe API

3. **ShopFlow Subscriptions**
   - Monthly recurring revenue
   - Track via Stripe API

4. **ShopLink Subscriptions**
   - Free tier (no revenue)
   - Paid tiers (Basic, Pro)
   - Track via Stripe API

---

## Revenue Tracking

### Monthly Revenue Calculation

**Total Monthly Revenue (MRR) =**
- Dealio MRR
- Quotely MRR
- ShopFlow MRR
- ShopLink MRR
- Plus one-time revenue (prorated)

### Tracking Methods

1. **Stripe API Integration**
   - Query Stripe for active subscriptions
   - Calculate MRR from subscription prices
   - Track one-time payments
   - Monitor refunds and cancellations

2. **Database Queries**
   - Query Super Admin analytics
   - Get financial metrics
   - Calculate revenue trends

3. **Reporting**
   - Generate monthly revenue reports
   - Track growth trends
   - Identify revenue sources

---

## Budget Scaling Rules

### Current Base Limits (Starting Point)

- **CEO (Alex)**: $300/month max spending
- **CFO (Finley)**: $150/month cost optimization, $300/month budget allocation
- **CTO (Taylor)**: $150/month infrastructure
- **CMO (Jeff)**: $0/month (drafts only, no spending)

### Scaling Formula

**As revenue grows, budgets scale proportionally:**

```
Scale Factor = Monthly Revenue / $1,000

Adjusted Budget = Base Budget × Scale Factor

Minimum: Base Budget (no reduction below base)
Maximum: Base Budget × 10 (cap at 10x for safety)
```

### Examples

**Month 1: $500 MRR**
- Scale Factor: 500 / 1000 = 0.5
- Budgets stay at base (minimum enforced)
- Alex: $300/month
- Finley: $150/$300/month
- Taylor: $150/month

**Month 3: $2,000 MRR**
- Scale Factor: 2000 / 1000 = 2.0
- Alex: $300 × 2 = $600/month
- Finley: $150 × 2 = $300/month cost optimization, $300 × 2 = $600/month allocation
- Taylor: $150 × 2 = $300/month

**Month 6: $5,000 MRR**
- Scale Factor: 5000 / 1000 = 5.0
- Alex: $300 × 5 = $1,500/month
- Finley: $150 × 5 = $750/month cost optimization, $300 × 5 = $1,500/month allocation
- Taylor: $150 × 5 = $750/month

**Month 12: $10,000 MRR**
- Scale Factor: 10000 / 1000 = 10.0 (capped)
- Alex: $300 × 10 = $3,000/month (max)
- Finley: $150 × 10 = $1,500/month cost optimization, $300 × 10 = $3,000/month allocation (max)
- Taylor: $150 × 10 = $1,500/month (max)

---

## Implementation

### Monthly Revenue Review

**Every month, you should:**

1. **Calculate Current MRR**
   - Query Stripe for active subscriptions
   - Sum all MRR sources
   - Include one-time revenue (prorated)

2. **Calculate Scale Factor**
   - Scale Factor = MRR / $1,000
   - Cap at 10.0 for safety
   - Minimum 1.0 (never reduce below base)

3. **Update Budget Limits**
   - Calculate new limits for each board member
   - Update policy files or configuration
   - Notify board members of new limits

4. **Report to CEO**
   - Share revenue numbers
   - Explain budget adjustments
   - Recommend strategic investments

### Revenue Tracking Endpoints

**Query Super Admin:**
```
GET /api/analytics
- Returns financial metrics
- Includes MRR, revenue, costs
```

**Query Stripe Directly:**
- Use Stripe API to get subscriptions
- Calculate MRR from prices
- Track payment history

---

## Budget Adjustment Protocol

### When Revenue Increases

1. **Calculate new limits** using scaling formula
2. **Notify CEO (Alex)** of budget increase
3. **Update configuration** with new limits
4. **Communicate to board** about increased capacity
5. **Monitor spending** to ensure responsible use

### When Revenue Decreases

1. **Calculate new limits** (but never below base)
2. **Notify CEO (Alex)** of budget constraints
3. **Prioritize essential spending** only
4. **Focus on revenue-generating activities**
5. **Recommend cost optimizations**

### Emergency Adjustments

**If revenue drops significantly:**
- Maintain base budgets (minimum)
- Focus on revenue recovery
- Defer non-essential spending
- Consult CEO for major decisions

---

## Reporting

### Monthly Revenue Report

**Include:**
- Total MRR
- Revenue by product (Dealio, Quotely, ShopFlow, ShopLink)
- Growth rate (month-over-month)
- Budget scale factor
- Adjusted budget limits
- Spending vs. budget
- Recommendations

### Quarterly Review

**Analyze:**
- Revenue trends
- Budget utilization
- ROI on spending
- Scaling effectiveness
- Strategic recommendations

---

## Key Principles

1. **Start Conservative**: Base budgets are low to ensure sustainability
2. **Scale Responsibly**: Only increase budgets as revenue grows
3. **Never Reduce Below Base**: Maintain minimum operational capacity
4. **Cap Growth**: Maximum 10x scaling prevents overspending
5. **Track Everything**: Monitor revenue and spending closely
6. **Report Regularly**: Keep CEO and board informed

---

## Revenue Goals

### Milestones

- **$1,000 MRR**: Base budgets (current)
- **$2,500 MRR**: 2.5x budgets
- **$5,000 MRR**: 5x budgets
- **$10,000 MRR**: 10x budgets (maximum)

### Growth Targets

- **Month 1-3**: Establish base revenue
- **Month 4-6**: Scale to 2-3x
- **Month 7-12**: Scale to 5-10x
- **Year 2+**: Maintain 10x or adjust formula

---

## Remember

**Your role is to:**
- Track revenue accurately
- Scale budgets responsibly
- Ensure financial sustainability
- Support growth with appropriate budgets
- Never compromise on core values (fair pricing, customer-first)

**As we make more money, we can invest more in:**
- Software quality improvements
- Customer success initiatives
- Marketing and growth
- Infrastructure and scaling
- Team expansion

**But always:**
- Start conservative
- Scale gradually
- Monitor closely
- Report transparently
- Prioritize sustainability

