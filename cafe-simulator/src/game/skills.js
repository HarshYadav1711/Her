// Skill Tree System

export const skillTree = {
    brewing: {
        name: 'Brewing Mastery',
        description: 'Improve your drink-making skills',
        icon: '☕',
        maxLevel: 10,
        effects: [
            { level: 1, description: 'Base brewing speed' },
            { level: 2, description: '+10% drink quality' },
            { level: 3, description: '+5% speed boost' },
            { level: 4, description: '+10% quality, unlock advanced recipes' },
            { level: 5, description: '+15% speed, +5% tips' },
            { level: 6, description: '+20% quality' },
            { level: 7, description: '+10% speed, unlock expert recipes' },
            { level: 8, description: '+25% quality, +10% tips' },
            { level: 9, description: '+15% speed' },
            { level: 10, description: 'Master Brewer: +50% quality, +20% tips, unlock all recipes' },
        ],
        unlocks: {
            4: ['advanced_recipes'],
            7: ['expert_recipes'],
            10: ['all_recipes', 'master_title'],
        }
    },
    service: {
        name: 'Customer Service',
        description: 'Improve customer satisfaction',
        icon: '😊',
        maxLevel: 10,
        effects: [
            { level: 1, description: 'Base customer satisfaction' },
            { level: 2, description: '+5% reputation gain' },
            { level: 3, description: 'Customers wait longer' },
            { level: 4, description: '+10% reputation, unlock VIP customers' },
            { level: 5, description: '+5% tips' },
            { level: 6, description: '+15% reputation' },
            { level: 7, description: 'Faster customer arrival' },
            { level: 8, description: '+20% reputation, +10% tips' },
            { level: 9, description: 'Unlock special events' },
            { level: 10, description: 'Service Master: +50% reputation, VIP customers daily' },
        ],
        unlocks: {
            4: ['vip_customers'],
            9: ['special_events'],
        }
    },
    efficiency: {
        name: 'Efficiency Expert',
        description: 'Reduce waste and improve resource management',
        icon: '⚡',
        maxLevel: 10,
        effects: [
            { level: 1, description: 'Base efficiency' },
            { level: 2, description: '-5% ingredient usage' },
            { level: 3, description: '+10% inventory capacity' },
            { level: 4, description: '-10% usage, unlock bulk buying' },
            { level: 5, description: '+20% capacity' },
            { level: 6, description: '-15% usage' },
            { level: 7, description: 'Auto-restock at 20%' },
            { level: 8, description: '-20% usage, +30% capacity' },
            { level: 9, description: 'Bulk discount 10%' },
            { level: 10, description: 'Efficiency Master: -50% usage, +50% capacity, auto-restock' },
        ],
        unlocks: {
            4: ['bulk_buying'],
            7: ['auto_restock'],
            10: ['master_efficiency'],
        }
    },
    charisma: {
        name: 'Charisma',
        description: 'Increase tips and customer loyalty',
        icon: '✨',
        maxLevel: 10,
        effects: [
            { level: 1, description: 'Base charisma' },
            { level: 2, description: '+5% tips' },
            { level: 3, description: '+10% tips' },
            { level: 4, description: 'Unlock customer conversations' },
            { level: 5, description: '+15% tips, +5% reputation' },
            { level: 6, description: '+20% tips' },
            { level: 7, description: 'Regular customers appear' },
            { level: 8, description: '+25% tips, +10% reputation' },
            { level: 9, description: 'Unlock special requests' },
            { level: 10, description: 'Charisma Master: +50% tips, regulars daily, special events' },
        ],
        unlocks: {
            4: ['conversations'],
            7: ['regular_customers'],
            9: ['special_requests'],
        }
    },
    management: {
        name: 'Café Management',
        description: 'Unlock new features and improve café operations',
        icon: '📊',
        maxLevel: 10,
        effects: [
            { level: 1, description: 'Basic management' },
            { level: 2, description: 'Unlock inventory management' },
            { level: 3, description: 'Unlock staff hiring (future)' },
            { level: 4, description: 'Unlock café expansion' },
            { level: 5, description: 'Unlock marketing campaigns' },
            { level: 6, description: 'Unlock special events' },
            { level: 7, description: 'Unlock franchise options (future)' },
            { level: 8, description: 'Unlock premium features' },
            { level: 9, description: 'Unlock all shop items' },
            { level: 10, description: 'Management Master: Unlock everything, +100% income' },
        ],
        unlocks: {
            2: ['inventory_management'],
            3: ['staff_system'],
            4: ['cafe_expansion'],
            5: ['marketing'],
            6: ['events'],
            7: ['franchise'],
            8: ['premium_features'],
            9: ['all_items'],
            10: ['master_management'],
        }
    },
};

export function getSkillEffect(skillName, level) {
    const skill = skillTree[skillName];
    if (!skill) return null;
    
    const effect = skill.effects.find(e => e.level === level) || skill.effects[skill.effects.length - 1];
    return effect;
}

export function getSkillUnlocks(skillName, level) {
    const skill = skillTree[skillName];
    if (!skill) return [];
    
    const unlocks = [];
    Object.entries(skill.unlocks || {}).forEach(([reqLevel, items]) => {
        if (level >= parseInt(reqLevel)) {
            unlocks.push(...items);
        }
    });
    return unlocks;
}

