const academicPlans = [
    {
        title: 'K-8 Literacy Foundations',
        summary: 'Reading, writing, grammar, and vocabulary pathways aligned to K-8 course sequences.',
        tags: ['K-8', 'literacy', 'reading', 'writing', 'academic']
    },
    {
        title: 'K-8 Math Pathways',
        summary: 'K-8 math progression from number sense and operations through fractions and pre-algebra readiness.',
        tags: ['K-8', 'math', 'elementary', 'middle school', 'academic']
    },
    {
        title: 'K-8 Science Inquiry',
        summary: 'Hands-on K-8 science support including life science, physical science, earth science, and scientific thinking.',
        tags: ['K-8', 'science', 'inquiry', 'academic']
    },
    {
        title: 'K-8 Social Studies',
        summary: 'Geography, civics, culture, economics, and history topics for elementary and middle school learners.',
        tags: ['K-8', 'social studies', 'history', 'civics', 'academic']
    },
    {
        title: 'High School Core Courses',
        summary: 'Comprehensive support for high school English, math, science, and social studies core classes.',
        tags: ['high school', 'core', 'english', 'math', 'science', 'history', 'academic']
    },
    {
        title: 'High School Honors & AP',
        summary: 'Rigorous honors and AP preparation, including exam-focused strategies and advanced coursework support.',
        tags: ['high school', 'honors', 'AP', 'advanced', 'academic']
    },
    {
        title: 'High School Dual Credit',
        summary: 'Dual credit guidance for college-aligned coursework, placement readiness, and transcript planning.',
        tags: ['high school', 'dual credit', 'college readiness', 'academic']
    },
    {
        title: 'College STEM Foundations',
        summary: 'College-level support for calculus, physics, chemistry, statistics, and foundational STEM performance.',
        tags: ['college', 'STEM', 'calculus', 'physics', 'chemistry', 'statistics', 'academic']
    },
    {
        title: 'College Advanced Sequences',
        summary: 'Advanced college sequences including differential equations, linear algebra, and upper-level science tracks.',
        tags: ['college', 'advanced', 'linear algebra', 'differential equations', 'academic']
    },
    {
        title: 'College Biology & Chemistry Tracks',
        summary: 'Structured support for general biology, genetics, and organic chemistry course pathways.',
        tags: ['college', 'biology', 'genetics', 'organic chemistry', 'academic']
    }
];

const lifeSkillsPlans = [
    {
        title: 'Automotive Basics',
        summary: 'Learn common car care, dashboard basics, and maintenance essentials.',
        tags: ['transportation', 'car']
    },
    {
        title: 'Cooking & Kitchen Safety',
        summary: 'Practice meal prep, safe cooking habits, and kitchen confidence.',
        tags: ['cooking', 'safety']
    },
    {
        title: 'Taxes & Legal Documents',
        summary: 'Understand basic tax forms and important personal paperwork.',
        tags: ['finance', 'legal']
    },
    {
        title: 'Budgeting & Personal Finance',
        summary: 'Create budgets, track spending, and make smarter money choices.',
        tags: ['finance', 'budgeting']
    },
    {
        title: 'Home Maintenance & Repairs',
        summary: 'Handle simple fixes and understand basic home upkeep.',
        tags: ['home', 'repairs']
    },
    {
        title: 'First Aid & Emergency Response',
        summary: 'Build calm, practical response skills for urgent situations.',
        tags: ['safety', 'emergency']
    },
    {
        title: 'Job Readiness & Workplace Skills',
        summary: 'Practice the habits and professionalism employers expect.',
        tags: ['career', 'workplace']
    },
    {
        title: 'Digital Literacy & Online Safety',
        summary: 'Use technology wisely and stay safer online.',
        tags: ['digital', 'safety', 'technology']
    },
    {
        title: 'Sewing, Laundry & Clothing Care',
        summary: 'Learn simple clothing care that saves time and money.',
        tags: ['home', 'clothing']
    },
    {
        title: 'Time Management & Productivity',
        summary: 'Set priorities, manage time, and follow through consistently.',
        tags: ['productivity', 'time management']
    },
    {
        title: 'Mental Health & Self-Care',
        summary: 'Build sustainable routines for stress management and well-being.',
        tags: ['mental health', 'self-care']
    },
    {
        title: 'Navigating Healthcare & Insurance',
        summary: 'Understand appointments, coverage, and basic healthcare systems.',
        tags: ['healthcare', 'insurance']
    },
    {
        title: 'Communication & Conflict Resolution',
        summary: 'Strengthen listening, speaking, and calm problem-solving.',
        tags: ['communication', 'conflict']
    },
    {
        title: 'Networking & Building Professional Relationships',
        summary: 'Learn how to make connections and leave strong impressions.',
        tags: ['career', 'networking']
    },
    {
        title: 'Renting & Housing Basics',
        summary: 'Understand leases, deposits, roommates, and renter responsibilities.',
        tags: ['housing', 'renting']
    },
    {
        title: 'Grocery Shopping & Meal Planning',
        summary: 'Plan affordable meals and shop with more confidence.',
        tags: ['food', 'budgeting']
    },
    {
        title: 'Basic Legal Rights & Civic Literacy',
        summary: 'Learn everyday rights, responsibilities, and civic basics.',
        tags: ['legal', 'civics']
    },
    {
        title: 'Transportation & Getting Around Without a Car',
        summary: 'Navigate public transit, rideshares, and alternative travel options.',
        tags: ['transportation', 'navigation']
    },
    {
        title: 'Environmental Awareness & Sustainable Living',
        summary: 'Make practical choices that support sustainable daily living.',
        tags: ['environment', 'sustainability']
    },
    {
        title: 'Social Media Literacy & Personal Branding',
        summary: 'Use social platforms thoughtfully while protecting your reputation.',
        tags: ['social media', 'branding']
    },
    {
        title: 'Emotional Intelligence & Reading Social Cues',
        summary: 'Recognize emotions, social signals, and better responses.',
        tags: ['emotional intelligence', 'social skills']
    },
    {
        title: 'Critical Thinking & Evaluating Information',
        summary: 'Question claims, spot weak evidence, and think more clearly.',
        tags: ['critical thinking', 'information']
    },
    {
        title: 'Negotiation & Advocacy Skills',
        summary: 'Speak up effectively and negotiate with more confidence.',
        tags: ['communication', 'advocacy']
    },
    {
        title: 'Basic Contracts & Consumer Rights',
        summary: 'Understand common agreements and everyday consumer protections.',
        tags: ['contracts', 'consumer rights']
    },
    {
        title: 'Banking & Credit Basics',
        summary: 'Learn accounts, credit scores, and smarter borrowing habits.',
        tags: ['finance', 'credit']
    },
    {
        title: 'Investing & Building Wealth',
        summary: 'Understand beginner investing ideas and long-term money growth.',
        tags: ['finance', 'investing']
    },
    {
        title: 'Public Speaking & Presentation Skills',
        summary: 'Speak clearly, stay calm, and present with confidence.',
        tags: ['communication', 'public speaking']
    },
    {
        title: 'Conflict De-escalation & Boundary Setting',
        summary: 'Handle tense moments with calm language and clearer limits.',
        tags: ['conflict', 'boundaries']
    },
    {
        title: 'Study Skills & Learning How to Learn',
        summary: 'Build independent learning habits that transfer beyond school.',
        tags: ['study skills', 'learning']
    },
    {
        title: 'Goal Setting & Long-Term Planning',
        summary: 'Turn big goals into realistic plans and next steps.',
        tags: ['goals', 'planning']
    },
    {
        title: 'Personal Safety & Self-Defense Awareness',
        summary: 'Strengthen situational awareness and everyday safety habits.',
        tags: ['safety', 'self-defense']
    },
    {
        title: 'Relationship Skills & Healthy Boundaries in Relationships',
        summary: 'Build healthier habits for friendships, dating, and boundaries.',
        tags: ['relationships', 'boundaries']
    },
    {
        title: 'Basic Car Buying & Selling Online',
        summary: 'Understand pricing, listings, and safer vehicle transactions.',
        tags: ['car', 'consumer']
    },
    {
        title: 'Email Etiquette & Professional Writing',
        summary: 'Write clearer, more professional emails and messages.',
        tags: ['writing', 'communication']
    },
    {
        title: 'Understanding Contracts & Leases',
        summary: 'Read agreements more carefully before signing.',
        tags: ['contracts', 'housing']
    },
    {
        title: 'Entrepreneurship & Side Hustles',
        summary: 'Explore small business basics and side-income opportunities.',
        tags: ['business', 'entrepreneurship']
    },
    {
        title: 'Nutrition & Reading Food Labels',
        summary: 'Make more informed food choices and understand labels.',
        tags: ['nutrition', 'health']
    },
    {
        title: 'Travel Planning & Navigation',
        summary: 'Plan trips, compare options, and move around more confidently.',
        tags: ['travel', 'navigation']
    },
    {
        title: 'Etiquette & Social Graces for Adult Life',
        summary: 'Practice everyday manners and confidence in adult settings.',
        tags: ['etiquette', 'social']
    },
    {
        title: 'Life Admin & Organizing Your Adult Life',
        summary: 'Manage appointments, paperwork, and everyday responsibilities.',
        tags: ['organization', 'planning']
    }
];

const catalogSearch = document.getElementById('catalogSearch');
const catalogSearchStatus = document.getElementById('catalogSearchStatus');
const filterChips = document.querySelectorAll('.catalog-filter-chip');
const totalPlans = academicPlans.length + lifeSkillsPlans.length;
const FILTER_CHIP_NO_MATCH = '__filter-chip-no-match__';

const normalizeText = (value) => (value || '').toLowerCase().trim();
const escapeHtml = (value) => String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const filterPlans = (plans, query) => {
    if (!query) return plans;

    return plans.filter(plan => {
        const searchableText = [
            normalizeText(plan.title || ''),
            normalizeText(plan.summary || ''),
            ...plan.tags.map(normalizeText)
        ].join(' ');

        return searchableText.includes(query);
    });
};

const renderCatalog = (plans, targetId, variant) => {
    const grid = document.getElementById(targetId);
    if (!grid) return;

    if (!plans.length) {
        grid.innerHTML = `
            <div class="catalog-empty-state">
                <h3>No matches yet</h3>
                <p>Try a different keyword or tap one of the quick filters above.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = plans.map((plan, index) => `
        <article class="catalog-card catalog-card-${variant}">
            <div class="catalog-card-number">Plan ${index + 1}</div>
            <h3>${escapeHtml(plan.title)}</h3>
            <p>${escapeHtml(plan.summary)}</p>
            <div class="catalog-card-tags">
                ${plan.tags.map(tag => `<span class="catalog-card-tag">${escapeHtml(tag)}</span>`).join('')}
            </div>
        </article>
    `).join('');
};

const updateCounts = (academicCount, lifeCount) => {
    document.getElementById('academicPlanCount').textContent = academicCount;
    document.getElementById('lifeSkillsPlanCount').textContent = lifeCount;
    document.getElementById('totalPlanCount').textContent = academicCount + lifeCount;
    document.getElementById('academicHeadingCount').textContent = academicCount;
    document.getElementById('lifeHeadingCount').textContent = lifeCount;
};

const renderAllCatalogs = (query = '') => {
    const academicMatches = filterPlans(academicPlans, query);
    const lifeMatches = filterPlans(lifeSkillsPlans, query);
    const totalMatches = academicMatches.length + lifeMatches.length;

    renderCatalog(academicMatches, 'academicCatalogGrid', 'academic');
    renderCatalog(lifeMatches, 'lifeSkillsCatalogGrid', 'life');
    updateCounts(academicMatches.length, lifeMatches.length);

    catalogSearchStatus.textContent = query
        ? `Showing ${totalMatches} matching plans for “${query}”.`
        : `Showing all ${totalPlans} plans.`;
};

const setQuickFilter = (value) => {
    const normalizedValue = normalizeText(value);
    filterChips.forEach(chip => {
        chip.classList.toggle('is-active', normalizeText(chip.dataset.filter || '') === normalizedValue);
    });
};

const syncQuickFilter = (query) => {
    const normalizedQuery = normalizeText(query);
    const matchingChip = Array.from(filterChips).find(chip => normalizeText(chip.dataset.filter || '') === normalizedQuery);
    setQuickFilter(matchingChip ? matchingChip.dataset.filter || '' : FILTER_CHIP_NO_MATCH);
};

filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
        const value = chip.dataset.filter || '';
        if (catalogSearch) {
            catalogSearch.value = value;
        }
        setQuickFilter(value);
        renderAllCatalogs(normalizeText(value));
    });
});

if (catalogSearch) {
    catalogSearch.addEventListener('input', (event) => {
        const query = normalizeText(event.target.value);
        syncQuickFilter(query);
        renderAllCatalogs(query);
    });
}

renderAllCatalogs();
