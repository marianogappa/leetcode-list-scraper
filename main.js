const puppeteer = require('puppeteer');

(async () => {
    // Launch headless chrome
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Browse to some url
    await page.goto('https://leetcode.com/problemset/all/');

    // Define a function to extract and print the text
    async function extractAndPrintText() {
        // Wait for the page to load
        await page.waitForSelector('body');

        // Extract all text on the page
        const text = await page.evaluate(() => document.querySelector('body').innerText);

        // Split the text by newline characters
        const lines = text.split('\n');

        // Initialize an empty array to store the results
        const results = [];

        const firstLineRegex = /^\d+\. .+/;
        const secondLineRegex = /^[\d.]+%$/;
        const thirdLineRegex = /^(Easy|Medium|Hard)$/;

        // Loop through the lines and collect groups of 3 consecutive lines
        for (let i = 0; i < lines.length - 2; i++) {
            const firstLine = lines[i];
            const secondLine = lines[i + 1];
            const thirdLine = lines[i + 2];
            if (firstLineRegex.test(firstLine) && secondLineRegex.test(secondLine) && thirdLineRegex.test(thirdLine)) {
                // Create an object with keys "name", "acceptanceRate" and "difficulty", and those values
                const result = {
                    name: firstLine,
                    acceptanceRate: secondLine,
                    difficulty: thirdLine,
                };
                // Push the object to the results array
                results.push(result);
            }
        }

        // Print the results array
        console.log(results);
    }

    // Call the function for the first time
    await extractAndPrintText();

    // Define a function to check and click the next button
    async function checkAndClickNext() {
        // Check if a button tag with aria-label equal to "next" exists
        const nextButton = await page.$("button[aria-label='next']");
        if (nextButton) {
            // Wait for 3 seconds
            await page.waitForTimeout(3000);
            // Click on it
            await nextButton.click();
            // Wait for the navigation to finish
            // await page.waitForNavigation();
            // Call the extract and print function again
            await extractAndPrintText();
            // Call this function recursively until there is no next button
            await checkAndClickNext();
        } else {
            // Finish the script
            await browser.close();
        }
    }

    // Call the function for the first time
    await checkAndClickNext();
})();
