const { classifyMood } = require('../mood');

describe('classifyMood', () => {
    test('should classify as happy mood', () => {
        const features = { valence: 0.8, energy: 0.7 };
        const mood = classifyMood(features);
        expect(mood).toBe('happy');
    });

    test('should classify as sad mood', () => {
        const features = { valence: 0.3, energy: 0.3 };
        const mood = classifyMood(features);
        expect(mood).toBe('sad');
    });

    test('should classify as calm mood', () => {
        const features = { valence: 0.5, energy: 0.4 };
        const mood = classifyMood(features);
        expect(mood).toBe('calm');
    });
});


//ci test
