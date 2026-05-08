        const academicPlans = [
            {
                title: 'Math Boot Camp',
                summary: 'Strengthen foundational math skills and close learning gaps fast.',
                tags: ['math', 'foundations']
            },
            {
                title: 'Reading & Writing Intensive',
                summary: 'Build stronger comprehension, written responses, and core literacy habits.',
                tags: ['reading', 'writing', 'literacy']
            },
            {
                title: 'Science Exploration Lab',
                summary: 'Make science concepts stick through guided exploration and review.',
                tags: ['science', 'lab']
            },
            {
                title: 'SAT/ACT Prep Accelerator',
                summary: 'Target high-impact test prep strategies for college entrance exams.',
                tags: ['test prep', 'sat', 'act']
            },
            {
                title: 'Spanish/Language Immersion',
                summary: 'Build Spanish vocabulary, conversation skills, and confidence.',
                tags: ['spanish']
            },
            {
                title: 'Study Skills & Executive Function',
                summary: 'Improve planning, organization, and consistent study routines.',
                tags: ['study skills', 'executive function']
            },
            {
                title: 'Algebra Readiness Bridge',
                summary: 'Prepare students for algebra with prerequisite skill support.',
                tags: ['math', 'algebra']
            },
            {
                title: 'AP Course Preview',
                summary: 'Preview rigorous coursework before the school year begins.',
                tags: ['advanced', 'ap']
            },
            {
                title: 'Phonics & Early Reading (K–2)',
                summary: 'Support early readers with phonics, fluency, and decoding practice.',
                tags: ['phonics', 'reading', 'elementary']
            },
            {
                title: 'Math Facts Fluency (K–5)',
                summary: 'Build number speed and confidence for elementary math success.',
                tags: ['math', 'fluency', 'elementary']
            },
            {
                title: 'Writing Workshop (Middle)',
                summary: 'Strengthen paragraph structure, essays, and school writing habits.',
                tags: ['writing', 'middle school']
            },
            {
                title: 'Homework Accountability',
                summary: 'Keep students on track with routines, deadlines, and follow-through.',
                tags: ['homework', 'accountability']
            },
            {
                title: 'High School Credit Recovery',
                summary: 'Help students recover missed credits and regain momentum.',
                tags: ['high school', 'credit recovery']
            },
            {
                title: 'Kindergarten Readiness',
                summary: 'Prepare young learners for classroom routines, literacy, and math basics.',
                tags: ['kindergarten', 'readiness']
            },
            {
                title: 'STEM Enrichment',
                summary: 'Extend curiosity in math and science with deeper enrichment support.',
                tags: ['stem', 'enrichment']
            },
            {
                title: 'Geometry & Spatial Reasoning',
                summary: 'Develop visual reasoning and geometry problem-solving skills.',
                tags: ['math', 'geometry']
            },
            {
                title: 'Chemistry Preview',
                summary: 'Introduce key chemistry ideas before class gets challenging.',
                tags: ['science', 'chemistry']
            },
            {
                title: 'History & Social Studies',
                summary: 'Improve comprehension, retention, and discussion of social studies topics.',
                tags: ['history', 'social studies']
            },
            {
                title: 'Physics Preview',
                summary: 'Build confidence with core physics concepts before advanced coursework.',
                tags: ['science', 'physics']
            },
            {
                title: 'Vocabulary & Grammar',
                summary: 'Sharpen language mechanics for stronger speaking and writing.',
                tags: ['grammar', 'vocabulary']
            },
            {
                title: 'Handwriting & Fine Motor (K–3)',
                summary: 'Support handwriting control, spacing, and classroom readiness.',
                tags: ['handwriting', 'fine motor', 'elementary']
            },
            {
                title: 'Emotional Intelligence & Social Skills',
                summary: 'Develop self-awareness, empathy, and stronger peer interaction skills.',
                tags: ['emotional intelligence', 'social skills']
            },
            {
                title: 'College Essay Writing',
                summary: 'Craft stronger personal statements and application essays.',
                tags: ['college', 'essay', 'writing']
            },
            {
                title: 'Financial Literacy for Teens',
                summary: 'Teach money basics in a school-focused, teen-friendly format.',
                tags: ['finance', 'teens']
            },
            {
                title: 'Public Speaking & Debate',
                summary: 'Build argumentation, speaking presence, and structured communication.',
                tags: ['communication', 'public speaking', 'debate']
            },
            {
                title: 'Executive Function & ADHD',
                summary: 'Build systems for focus, planning, and follow-through.',
                tags: ['executive function', 'adhd']
            },
            {
                title: 'College Readiness Transition',
                summary: 'Prepare students for college routines, expectations, and independence.',
                tags: ['college', 'transition', 'readiness']
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
