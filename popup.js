document.addEventListener('DOMContentLoaded', async () => {
    // Function to update the DOM with problem data
    function updateProblem(elementId, title, link) {
      const element = document.getElementById(elementId);
      element.innerHTML = `<a href="${link}" target="_blank">${title}</a>`;
    }
  
    // Fetch GFG Problem of the Day
    async function fetchGFGPotd() {
      try {
        // Note: GFG doesn't have a public API for POTD. You'd need to scrape https://www.geeksforgeeks.org/problem-of-the-day
        // For simplicity, we'll use a placeholder. In practice, use a proxy server to fetch and parse HTML.
        const placeholderTitle = "GFG Problem of the Day - Placeholder";
        const placeholderLink = "https://www.geeksforgeeks.org/problem-of-the-day";
        updateProblem('gfg-potd', placeholderTitle, placeholderLink);
  
        // Uncomment and adapt this for real scraping with a proxy:
        /*
        const response = await fetch('https://your-proxy-server.com/scrape?url=https://www.geeksforgeeks.org/problem-of-the-day');
        const data = await response.json();
        const title = data.title; // Extracted from HTML
        const link = data.link;
        updateProblem('gfg-potd', title, link);
        */
      } catch (error) {
        console.error('Error fetching GFG POTD:', error);
        updateProblem('gfg-potd', 'Error loading GFG POTD', '#');
      }
    }
  
    // Fetch GFG Random Problem
    async function fetchGFGRandom() {
      try {
        // Placeholder: GFG practice problems don't have a direct random API. Scrape a list and pick randomly.
        const placeholderTitle = "GFG Random Problem - Placeholder";
        const placeholderLink = "https://www.geeksforgeeks.org/explore?page=1&sortBy=submissions";
        updateProblem('gfg-random', placeholderTitle, placeholderLink);
      } catch (error) {
        console.error('Error fetching GFG Random:', error);
        updateProblem('gfg-random', 'Error loading GFG Random', '#');
      }
    }
  
    // Fetch LeetCode Problem of the Day
    async function fetchLeetCodePotd() {
      try {
        // LeetCode uses GraphQL for daily challenges. Reverse-engineer their API (unofficial).
        const response = await fetch('https://leetcode.com/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: `
              query questionOfToday {
                activeDailyCodingChallengeQuestion {
                  link
                  question {
                    title
                  }
                }
              }
            `
          })
        });
        const data = await response.json();
        const title = data.data.activeDailyCodingChallengeQuestion.question.title;
        const link = `https://leetcode.com${data.data.activeDailyCodingChallengeQuestion.link}`;
        updateProblem('leetcode-potd', title, link);
      } catch (error) {
        console.error('Error fetching LeetCode POTD:', error);
        updateProblem('leetcode-potd', 'Error loading LeetCode POTD', '#');
      }
    }
  
    // Fetch LeetCode Random Problem
    async function fetchLeetCodeRandom() {
      try {
        // Fetch list of problems and pick a random one
        const response = await fetch('https://leetcode.com/api/problems/all/');
        const problems = await response.json();
        const randomIndex = Math.floor(Math.random() * problems.stat_status_pairs.length);
        const problem = problems.stat_status_pairs[randomIndex];
        const title = problem.stat.question__title;
        const link = `https://leetcode.com/problems/${problem.stat.question__title_slug}/`;
        updateProblem('leetcode-random', title, link);
      } catch (error) {
        console.error('Error fetching LeetCode Random:', error);
        updateProblem('leetcode-random', 'Error loading LeetCode Random', '#');
      }
    }
  
    // Load all problems
    fetchGFGPotd();
    fetchGFGRandom();
    fetchLeetCodePotd();
    fetchLeetCodeRandom();
  });