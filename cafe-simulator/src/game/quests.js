// Quest System for RPG-style gameplay

export const questTypes = {
    STORY: 'story',
    DAILY: 'daily',
    ACHIEVEMENT: 'achievement',
    CHALLENGE: 'challenge',
};

export const initialQuests = [
    {
        id: 'welcome',
        type: questTypes.STORY,
        title: 'Welcome to Your Café!',
        description: 'Serve your first customer and make them happy.',
        objective: { type: 'serve_customer', count: 1 },
        reward: { money: 50, xp: 20 },
        unlocked: true,
    },
    {
        id: 'first_perfect',
        type: questTypes.STORY,
        title: 'Perfect Brew',
        description: 'Make a perfect drink (correct recipe).',
        objective: { type: 'perfect_drink', count: 1 },
        reward: { money: 30, xp: 15 },
        unlocked: false,
    },
    {
        id: 'serve_10',
        type: questTypes.ACHIEVEMENT,
        title: 'Getting Started',
        description: 'Serve 10 customers successfully.',
        objective: { type: 'serve_customer', count: 10 },
        reward: { money: 100, xp: 50 },
        unlocked: false,
    },
    {
        id: 'level_up',
        type: questTypes.STORY,
        title: 'Level Up!',
        description: 'Reach level 2.',
        objective: { type: 'reach_level', level: 2 },
        reward: { money: 75, xp: 30, skillPoints: 1 },
        unlocked: false,
    },
    {
        id: 'master_brewer',
        type: questTypes.ACHIEVEMENT,
        title: 'Master Brewer',
        description: 'Make 5 perfect drinks in a row.',
        objective: { type: 'perfect_streak', count: 5 },
        reward: { money: 200, xp: 100 },
        unlocked: false,
    },
    {
        id: 'decorate',
        type: questTypes.STORY,
        title: 'Make It Cozy',
        description: 'Buy your first decoration item.',
        objective: { type: 'buy_decor', count: 1 },
        reward: { money: 25, xp: 10 },
        unlocked: false,
    },
];

export const dailyQuests = [
    {
        id: 'daily_serve_5',
        type: questTypes.DAILY,
        title: 'Daily Service',
        description: 'Serve 5 customers today.',
        objective: { type: 'serve_customer', count: 5 },
        reward: { money: 50, xp: 25 },
        expiresIn: 24, // hours
    },
    {
        id: 'daily_perfect_3',
        type: questTypes.DAILY,
        title: 'Perfect Day',
        description: 'Make 3 perfect drinks today.',
        objective: { type: 'perfect_drink', count: 3 },
        reward: { money: 75, xp: 30 },
        expiresIn: 24,
    },
    {
        id: 'daily_earn_100',
        type: questTypes.DAILY,
        title: 'Daily Earnings',
        description: 'Earn 100 coins today.',
        objective: { type: 'earn_money', amount: 100 },
        reward: { money: 50, xp: 20 },
        expiresIn: 24,
    },
];

export function generateDailyQuests() {
    // Select 2-3 random daily quests
    const shuffled = [...dailyQuests].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.floor(Math.random() * 2) + 2).map(quest => ({
        ...quest,
        id: `${quest.id}_${Date.now()}`,
        startTime: Date.now(),
    }));
}

export function checkQuestProgress(quest, gameState) {
    const { objective } = quest;
    const { stats, player } = gameState;
    
    switch (objective.type) {
        case 'serve_customer':
            return stats.customersServed >= objective.count;
        case 'perfect_drink':
            return stats.perfectDrinks >= objective.count;
        case 'perfect_streak':
            // This would need streak tracking in state
            return false; // Placeholder
        case 'reach_level':
            return player.level >= objective.level;
        case 'buy_decor':
            // Would need to track decor purchases
            return false; // Placeholder
        case 'earn_money':
            // Would need daily earnings tracking
            return false; // Placeholder
        default:
            return false;
    }
}

