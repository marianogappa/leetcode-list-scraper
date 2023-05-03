# leetcode-list-scraper

Scrape the full list of Leetcode problem names, acceptance rates & difficulties from their website.

## Install

```sh
# Install node from https://nodejs.org/en/download/

$ git clone git@github.com:marianogappa/leetcode-list-scraper.git
$ cd leetcode-list-scraper
$ npm install
```

## Run

```sh
$ node main.js
```

## Output example

```
[
  { name: '1. Two Sum', acceptanceRate: '49.8%', difficulty: 'Easy' },
  {
    name: '2. Add Two Numbers',
    acceptanceRate: '40.5%',
    difficulty: 'Medium'
  },
  {
    name: '3. Longest Substring Without Repeating Characters',
    acceptanceRate: '33.8%',
    difficulty: 'Medium'
  },
  {
    name: '4. Median of Two Sorted Arrays',
    acceptanceRate: '36.4%',
    difficulty: 'Hard'
  },
  ...
```

## How did you code this?

I asked this to ChatGPT:

```
Build me a puppeteer script that, using headless chrome:

1) Browses to some url
2) Waits for it to load
3) Extracts all text on it using something like "$('body').innerText"
4) That text will be a "\n" separated multi-line string
5) Collect groups of 3 consecutive lines where the first line is an integer followed by a dot, a space and some text, the second line is a percentage and the third line one of the following 3 literal strings: Easy, Medium or Hard. Collect them into an array of objects with keys "name", "acceptanceRate" and "difficulty", and those values.
6) Print that array.
7) Check if a button tag with aria-label equal to "next", i.e. "button[aria-label='next']", exists. If it doesn't exist, finish the script. If it exists, click on it, and continue from step 2.
```
