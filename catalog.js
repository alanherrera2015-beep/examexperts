const academicPlans = [
    {
        title: 'Math Boot Camp',
        summary: 'Strengthen foundational math skills and close learning gaps fast.',
        tags: ['summer', 'math', 'foundations']
    },
    {
        title: 'Reading & Writing Intensive',
        summary: 'Build stronger comprehension, written responses, and core literacy habits.',
        tags: ['summer', 'reading', 'writing', 'literacy']
    },
    {
        title: 'Science Exploration Lab',
        summary: 'Make science concepts stick through guided exploration and review.',
        tags: ['summer', 'science', 'lab']
    },
    {
        title: 'SAT/ACT Prep Accelerator',
        summary: 'Target high-impact test prep strategies for college entrance exams.',
        tags: ['summer', 'test prep', 'sat', 'act']
    },
    {
        title: 'Spanish Immersion',
        summary: 'Build Spanish vocabulary, conversation skills, and confidence.',
        tags: ['summer', 'spanish']
    },
    {
        title: 'Study Skills & Executive Function',
        summary: 'Improve planning, organization, and consistent study routines.',
        tags: ['summer', 'study skills', 'executive function']
    },
    {
        title: 'Algebra Readiness Bridge',
        summary: 'Prepare students for algebra with prerequisite skill support.',
        tags: ['summer', 'math', 'algebra']
    },
    {
        title: 'AP Course Preview',
        summary: 'Preview rigorous coursework before the school year begins.',
        tags: ['summer', 'advanced', 'ap']
    },
    {
        title: 'Phonics & Early Reading (K–2)',
        summary: 'Support early readers with phonics, fluency, and decoding practice.',
        tags: ['summer', 'phonics', 'reading', 'elementary']
    },
    {
        title: 'Math Facts Fluency (K–5)',
        summary: 'Build number speed and confidence for elementary math success.',
        tags: ['summer', 'math', 'fluency', 'elementary']
    },
    {
        title: 'Writing Workshop (Middle)',
        summary: 'Strengthen paragraph structure, essays, and school writing habits.',
        tags: ['summer', 'writing', 'middle school']
    },
    {
        title: 'Homework Accountability',
        summary: 'Keep students on track with routines, deadlines, and follow-through.',
        tags: ['summer', 'homework', 'accountability']
    },
    {
        title: 'High School Credit Recovery',
        summary: 'Help students recover missed credits and regain momentum.',
        tags: ['summer', 'high school', 'credit recovery']
    },
    {
        title: 'Kindergarten Readiness',
        summary: 'Prepare young learners for classroom routines, literacy, and math basics.',
        tags: ['summer', 'kindergarten', 'readiness']
    },
    {
        title: 'STEM Enrichment',
        summary: 'Extend curiosity in math and science with deeper enrichment support.',
        tags: ['summer', 'stem', 'enrichment']
    },
    {
        title: 'Geometry & Spatial Reasoning',
        summary: 'Develop visual reasoning and geometry problem-solving skills.',
        tags: ['summer', 'math', 'geometry']
    },
    {
        title: 'Chemistry Preview',
        summary: 'Introduce key chemistry ideas before class gets challenging.',
        tags: ['summer', 'science', 'chemistry']
    },
    {
        title: 'History & Social Studies',
        summary: 'Improve comprehension, retention, and discussion of social studies topics.',
        tags: ['summer', 'history', 'social studies']
    },
    {
        title: 'Physics Preview',
        summary: 'Build confidence with core physics concepts before advanced coursework.',
        tags: ['summer', 'science', 'physics']
    },
    {
        title: 'Vocabulary & Grammar',
        summary: 'Sharpen language mechanics for stronger speaking and writing.',
        tags: ['summer', 'grammar', 'vocabulary']
    },
    {
        title: 'Handwriting & Fine Motor (K–3)',
        summary: 'Support handwriting control, spacing, and classroom readiness.',
        tags: ['summer', 'handwriting', 'fine motor', 'elementary']
    },
    {
        title: 'College Essay Writing',
        summary: 'Craft stronger personal statements and application essays.',
        tags: ['summer', 'college', 'essay', 'writing']
    },
    {
        title: 'Financial Literacy for Teens',
        summary: 'Teach money basics in a school-focused, teen-friendly format.',
        tags: ['summer', 'finance', 'teens']
    },
    {
        title: 'Executive Function & ADHD',
        summary: 'Build systems for focus, planning, and follow-through.',
        tags: ['summer', 'executive function', 'adhd']
    },
    {
        title: 'College Readiness Transition',
        summary: 'Prepare students for college routines, expectations, and independence.',
        tags: ['summer', 'college', 'transition', 'readiness']
    }
];

const lifeSkillsPlans = [
    {
        title: 'Automotive Basics',
        summary: 'Learn common car care, dashboard basics, and maintenance essentials.',
        tags: ['summer', 'transportation', 'car']
    },
    {
        title: 'Cooking & Kitchen Safety',
        summary: 'Practice meal prep, safe cooking habits, and kitchen confidence.',
        tags: ['summer', 'cooking', 'safety']
    },
    {
        title: 'Taxes & Legal Documents',
        summary: 'Understand basic tax forms and important personal paperwork.',
        tags: ['summer', 'finance', 'legal']
    },
    {
        title: 'Budgeting & Personal Finance',
        summary: 'Create budgets, track spending, and make smarter money choices.',
        tags: ['summer', 'finance', 'budgeting']
    },
    {
        title: 'Home Maintenance & Repairs',
        summary: 'Handle simple fixes and understand basic home upkeep.',
        tags: ['summer', 'home', 'repairs']
    },
    {
        title: 'First Aid & Emergency Response',
        summary: 'Build calm, practical response skills for urgent situations.',
        tags: ['summer', 'safety', 'emergency']
    },
    {
        title: 'Job Readiness & Workplace Skills',
        summary: 'Practice the habits and professionalism employers expect.',
        tags: ['summer', 'career', 'workplace']
    },
    {
        title: 'Digital Literacy & Online Safety',
        summary: 'Use technology wisely and stay safer online.',
        tags: ['summer', 'digital', 'safety', 'technology']
    },
    {
        title: 'Sewing, Laundry & Clothing Care',
        summary: 'Learn simple clothing care that saves time and money.',
        tags: ['summer', 'home', 'clothing']
    },
    {
        title: 'Time Management & Productivity',
        summary: 'Set priorities, manage time, and follow through consistently.',
        tags: ['summer', 'productivity', 'time management']
    },
    {
        title: 'Mental Health & Self-Care',
        summary: 'Build sustainable routines for stress management and well-being.',
        tags: ['summer', 'mental health', 'self-care']
    },
    {
        title: 'Navigating Healthcare & Insurance',
        summary: 'Understand appointments, coverage, and basic healthcare systems.',
        tags: ['summer', 'healthcare', 'insurance']
    },
    {
        title: 'Communication & Conflict Resolution',
        summary: 'Strengthen listening, speaking, and calm problem-solving.',
        tags: ['summer', 'communication', 'conflict']
    },
    {
        title: 'Networking & Building Professional Relationships',
        summary: 'Learn how to make connections and leave strong impressions.',
        tags: ['summer', 'career', 'networking']
    },
    {
        title: 'Renting & Housing Basics',
        summary: 'Understand leases, deposits, roommates, and renter responsibilities.',
        tags: ['summer', 'housing', 'renting']
    },
    {
        title: 'Grocery Shopping & Meal Planning',
        summary: 'Plan affordable meals and shop with more confidence.',
        tags: ['summer', 'food', 'budgeting']
    },
    {
        title: 'Basic Legal Rights & Civic Literacy',
        summary: 'Learn everyday rights, responsibilities, and civic basics.',
        tags: ['summer', 'legal', 'civics']
    },
    {
        title: 'Transportation & Getting Around Without a Car',
        summary: 'Navigate public transit, rideshares, and alternative travel options.',
        tags: ['summer', 'transportation', 'navigation']
    },
    {
        title: 'Environmental Awareness & Sustainable Living',
        summary: 'Make practical choices that support sustainable daily living.',
        tags: ['summer', 'environment', 'sustainability']
    },
    {
        title: 'Social Media Literacy & Personal Branding',
        summary: 'Use social platforms thoughtfully while protecting your reputation.',
        tags: ['summer', 'social media', 'branding']
    },
    {
        title: 'Emotional Intelligence & Reading Social Cues',
        summary: 'Recognize emotions, social signals, and better responses.',
        tags: ['summer', 'emotional intelligence', 'social skills']
    },
    {
        title: 'Critical Thinking & Evaluating Information',
        summary: 'Question claims, spot weak evidence, and think more clearly.',
        tags: ['summer', 'critical thinking', 'information']
    },
    {
        title: 'Negotiation & Advocacy Skills',
        summary: 'Speak up effectively and negotiate with more confidence.',
        tags: ['summer', 'communication', 'advocacy']
    },
    {
        title: 'Basic Contracts & Consumer Rights',
        summary: 'Understand common agreements and everyday consumer protections.',
        tags: ['summer', 'contracts', 'consumer rights']
    },
    {
        title: 'Banking & Credit Basics',
        summary: 'Learn accounts, credit scores, and smarter borrowing habits.',
        tags: ['summer', 'finance', 'credit']
    },
    {
        title: 'Investing & Building Wealth',
        summary: 'Understand beginner investing ideas and long-term money growth.',
        tags: ['summer', 'finance', 'investing']
    },
    {
        title: 'Public Speaking & Presentation Skills',
        summary: 'Speak clearly, stay calm, and present with confidence.',
        tags: ['summer', 'communication', 'public speaking']
    },
    {
        title: 'Conflict De-escalation & Boundary Setting',
        summary: 'Handle tense moments with calm language and clearer limits.',
        tags: ['summer', 'conflict', 'boundaries']
    },
    {
        title: 'Study Skills & Learning How to Learn',
        summary: 'Build independent learning habits that transfer beyond school.',
        tags: ['summer', 'study skills', 'learning']
    },
    {
        title: 'Goal Setting & Long-Term Planning',
        summary: 'Turn big goals into realistic plans and next steps.',
        tags: ['summer', 'goals', 'planning']
    },
    {
        title: 'Personal Safety & Self-Defense Awareness',
        summary: 'Strengthen situational awareness and everyday safety habits.',
        tags: ['summer', 'safety', 'self-defense']
    },
    {
        title: 'Relationship Skills & Healthy Boundaries in Relationships',
        summary: 'Build healthier habits for friendships, dating, and boundaries.',
        tags: ['summer', 'relationships', 'boundaries']
    },
    {
        title: 'Basic Car Buying & Selling Online',
        summary: 'Understand pricing, listings, and safer vehicle transactions.',
        tags: ['summer', 'car', 'consumer']
    },
    {
        title: 'Email Etiquette & Professional Writing',
        summary: 'Write clearer, more professional emails and messages.',
        tags: ['summer', 'writing', 'communication']
    },
    {
        title: 'Understanding Contracts & Leases',
        summary: 'Read agreements more carefully before signing.',
        tags: ['summer', 'contracts', 'housing']
    },
    {
        title: 'Entrepreneurship & Side Hustles',
        summary: 'Explore small business basics and side-income opportunities.',
        tags: ['summer', 'business', 'entrepreneurship']
    },
    {
        title: 'Nutrition & Reading Food Labels',
        summary: 'Make more informed food choices and understand labels.',
        tags: ['summer', 'nutrition', 'health']
    },
    {
        title: 'Travel Planning & Navigation',
        summary: 'Plan trips, compare options, and move around more confidently.',
        tags: ['summer', 'travel', 'navigation']
    },
    {
        title: 'Etiquette & Social Graces for Adult Life',
        summary: 'Practice everyday manners and confidence in adult settings.',
        tags: ['summer', 'etiquette', 'social']
    },
    {
        title: 'Life Admin & Organizing Your Adult Life',
        summary: 'Manage appointments, paperwork, and everyday responsibilities.',
        tags: ['summer', 'organization', 'planning']
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
        ? `Showing ${totalMatches} matching plans for "${query}".`
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
