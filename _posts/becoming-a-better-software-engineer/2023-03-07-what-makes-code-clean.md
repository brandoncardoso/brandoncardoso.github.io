---
title: What Makes Code "Clean"?
tags: [software engineering]
---
What does it mean for code to be "clean"? You've probably seen code at some point that when you read it, you could _feel_ it was well written, but what about it was special? What about code that made you feel dirty and practically begged you to make changes to it? What qualities does code need to have for it to be considered good?

I highly recommend anyone interested in writing clean code to read [*Clean Code: A Handbook of Agile Software* by Robert Martin](https://amzn.to/3Ef9Ace). It contains significantly more information and in-depth examples than I plan to include here. This will be more of a quick summary of some key points I think are important or that should be at least thought about consciously.

## What is Clean Code?
To start, having a definition of clean code would be helpful. I think this quote from Bjarne Stroustrup (creator of C++) in *Clean Code* is a strong starting point.

> I like my code to be elegant and efficient. The logic should be straightforward to make it hard for bugs to hide, the dependencies minimal to ease maintenance, error handling complete according to an articulated strategy, and performance close to optimal so as not to tempt people to make the code messy with unprincipled optimizations. Clean code does one thing well.

Elegant and efficient. When you find truly clean code, you just know. Something deep in your brain can tell it's well made. It's easy to read, and you quickly understand what purpose it serves. It feels "complete", in the sense that there's nothing obvious you can think about adding or that needs to be fixed. It's isolated from external dependencies that might cause problems in future refactoring. So how do we get there?

## Clean Code Principles
### Naming
It's a pretty common joke that giving something a good name is one of the hardest problems in programming. A bad name can make code infinitely more difficult to understand.

A good name should...
* **Reveal intent/purpose** &mdash; How easily can you tell what a variable named `d` is for vs. `daysSinceLastUpdate`
* **Be truthful** &mdash; Don't give something a name like `postList` if it's not a list
* **Be meaningfully distinct** &mdash; Does it show a clear separation between similar things? Which function definition is more useful, `copy(string1, string2)` or `copy(source, destination)`?
* **Be pronounceable** &mdash; Imagine talking to your co-workers about a variable called `lu_ymdhms` vs. `lastUpdateTimestamp`
* **Be searchable** &mdash; Searching for the `get` function might return many unrelated matches compared to a function called `getAllPosts`


### Comments
Comments are meant to help future code readers, but what often ends up happening is the comments are just something else that needs to be updated along with the code. If someone makes a change to code with a comment, but doesn't update the comment, now that comment is inaccurate disinformation. A comment should explain "why", not "how". If you need a comment to explain how your code works, that's a clear sign that you should refactor the code to make it more readable.

For example, long/complicated if statements can usually be broken down.
```typescript
// users can only edit blog posts that they are an editor for and that are unlocked
// admins can edit anything
if (user.isAdmin() ||
  (post.type === PostType.BLOG && post.editors.contains(user) && !post.locked))
  ...
}
```

```typescript
const isBlogPost = post.type === PostType.BLOG
const userCanEdit = isBlogPost && post.editors.contains(user) && !post.locked

if (user.isAdmin() || userCanEdit) {
  ...
}
```

Acceptable Comments
* **Informative comments** &mdash; Provides information that is difficult/impossible to express in the code, like explaining a regular expression
* **Explanations of intent** &mdash; Explains the reasoning behind a decision or why something was implemented in a certain way
* **TODO comments** &mdash; Marking areas of the code for improvement, but they should be addressed and removed quickly

Bad Comments
* **Redundant comments** &mdash; Repeating what the code already says
* **Misleading comments** &mdash; Inaccurate, too vague, or lie about what the code does
* **Required comments** &mdash; Comments should not be required. They are difficult to maintain, and easily slip into redundancy and misinformation
* **Commented out code** &mdash; Remove code that is not being used. It quickly becomes outdated and your version control software should already have a record of it anyway

### Functions
One of the scariest things to find when programming is a monster, several hundred line long function. You want to fix a bug, or add some new functionality, but you have no idea where to begin. Functions that large are too complex to fit in your head and probably filled with a tonne of logic branches. Any small change at the beginning of the function could affect who-knows-what by the end of the function. The only way to understand is to read through each line and try to maintain the state of everything in your mind.

A clean function should...
* **Be small** &mdash; Make your functions as small as possible so they are quick to read and understand
* **Do one thing** &mdash; If a function does multiple tasks, refactor and break it up into smaller more focused functions
* **Have a descriptive name** &mdash; It should be obvious what a function does just from reading its name
* **Have zero or few arguments** &mdash; The fewer arguments a function has, the easier it is to use and understand. More arguments also makes testing more difficult
* **Have no side effects** &mdash; A function should not modify any external data, especially if those changes are not obvious from the function name
* **Throw an exception, not return an error code** &mdash; Exceptions allow error handling to be done later/separately while error codes require handling immediately and cause clutter

### Classes
Classes are a more high level way to organize code.

Classes should...
* **Be small** &mdash; Instead of lines of code, classes count size by number of responsibilities. Classes should have a single responsibility. [Related: The Single-Responsibility Principle](https://en.wikipedia.org/wiki/Single-responsibility_principle)
* **Have a descriptive name** &mdash; It should describe the responsibilities the class handles
* **Be encapsulated** &mdash; Variables and helper functions should be private unless necessary
* **Be cohesive** &mdash; Each function in a class should use all/many of the class's instance variables. If a class has low cohesiveness, you should try to refactor/split it into sub-classes
* **Be isolated from change** &mdash; Classes should be designed in a way as to not depend on external dependencies. Decoupling dependencies makes testing easier, and makes it easier to understand what a class does. [Related: The Open-Closed Principle](https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle)

### Testing
Keeping code clean requires frequent refactors. To be able to refactor with confidence that you aren't breaking anything or introducing new bugs, the code should have high test coverage. Tests deserve the same amount of attention as regular code. Tests must change with the code, so maintaining clean tests makes it easier to keep up with those changes.

Tests should be...
* **Readable** &mdash; It should be clear at a glance what a test is for
* **Fast** &mdash; Tests should be run frequently, and if your tests are too slow, you're less likely to run them
* **Isolated** &mdash; They should run independently, and in any order
* **Repeatable** &mdash; They should be deterministic. The result of a test shouldn't change depending on which system it is run on, or between runs with no other changes made
* **Self-validating** &mdash; You shouldn't have to manually verify any test results, they should pass or fail on their own
* **Thorough** &mdash; Cover all code paths, edge cases, etc.

## Conclusion
Hopefully I was able to concisely explain these basic clean code principles. There are many more things to consider when trying to write clean code that I didn't mention, so if you're interested, definitely check out [*Clean Code: A Handbook of Agile Software* by Robert Martin](https://amzn.to/3Ef9Ace). 

### What's Next
Testing is such a critical part of writing clean, reliable, and maintainable code, so next I will be reading [*Test-Driven Development: By Example* by Kent Beck](https://amzn.to/3KWnEf3).
