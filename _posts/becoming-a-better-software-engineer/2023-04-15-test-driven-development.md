---
title: The Importance of Testing and Test-Driven Development
tags: [software engineering, testing]
---

As developers, we all want to create high-quality, reliable software systems, so if you could catch bugs in your code before any problems arise, wouldn't you? Test-Driven Development (TDD) helps make that possible as well as increasing your development speed, code quality, and overall system confidence.


## Why Bother Writing Tests At All?

Imagine you are a surgeon about to perform a surgery. To prepare, you need to wash your hands to make sure they are completely free of any harmful bacteria. You wet your hands and forearms with warm water, apply soap, and lather thoroughly. You scrub each part of your arm vigorously for at least 20 seconds, starting at your fingertips, and working your way up to your elbows, ensuring that every part is clean. Then you rinse with warm water again and make sure all the soap is washed away. Finally, you dry yourself off with a sterile towel, put on a sterile surgical gown and gloves and are ready.

This process takes you maybe 10-15 minutes before each surgery. Lately, the hospital you work at has been very busy, and the hospital director asks you to skip washing your hands to save time and be more efficient. As a doctor, you understand the importance of following the correct procedure and would (hopefully) refuse to compromise the safety of your patients. Washing your hands is a matter of professionalism, and you take pride in delivering the highest quality of care, doing everything in your power to reduce the risk of infection, and ensuring the best outcome for your patients.

Similarly, as software engineers, we need to ensure that our software is clean and free of any harmful bugs or errors that could affect our users. Writing tests is a necessary step in software development to ensure quality and reliability. Your manager, boss, and/or clients may not want you to spend time and resources on testing, but as a professional, it is your responsibility to refuse to compromise on the quality and reliability of the software you create.


### Specific Benefits of Writing Tests

1. **Improve maintainability**: Tests ensure code is maintainable, resulting in faster development cycles

2. **Catch bugs early**: Tests identify bugs early, leading to higher quality software

3. **Enable confident refactoring**: Tests provide assurance that changes won't break existing functionality, making it easier to optimize code

4. **Verify business requirements and enable CI/CD**: Tests ensure that the software meets the defined business requirements and automate the process of checking for code changes as part of a CI/CD process

5. **Facilitate collaboration**: Tests provide a shared understanding, allowing team members to work together more efficiently, for example through pair programming

6. **Enhance documentation**: Tests can serve as documentation for expected behaviour, helping new members understand the software

7. **Improve confidence**: Writing tests increases confidence in the quality and reliability, leading to better user experiences


## So What is TDD?

TDD is an approach to software development where automated tests are written before any code. The process usually follows these steps:

1. <span class="text--red">**Write a failing test**</span> - describe the behaviour you want to implement
2. <span class="text--green">**Pass the test**</span> - write the bare minimum code required to make the test pass
3. **Refactor** - refine the code to improve design and maintainability
4. **Repeat** - do it again

The goal of TDD is to ensure that the software meets the defined requirements and behaves as expected, while also maintaining high code quality and avoiding regression bugs. By following a rigorous testing process throughout development, TDD helps to catch bugs early, improve maintainability, and build confidence in the software.


## How To Write Effective Tests

When testing your code, it's important to focus on its behaviour in response to different inputs and conditions, including edge cases and error conditions. You should also consider testing for non-functional requirements such as performance and security to ensure compliance with relevant standards. Avoid testing implementation details such as private methods and variables, as they are subject to change and can lead to brittle tests. Testing implementation details can also be time-consuming and take the focus away from ensuring the software meets the defined requirements and behaves as expected.

With those things in mind, follow the FIRST principles to write effective tests...

* **Fast**: Tests should be fast to enable frequent execution and to provide feedback as quickly as possible

* **Isolated**: Tests should be independent to isolate and troubleshot bugs more quickly

* **Repeatable**: Tests should be repeatable to ensure consistent and reliable results

* **Self-validating**: Tests should have a boolean output to automate the testing process and avoid manually verifying

* **Thorough**: Tests should be thorough to ensure that all aspects of the software are tested, including edge cases and unexpected scenarios

## TDD Is Not Perfect

While TDD offers many benefits, it's important to recognize that it's not a perfect solution and there are still some possible drawbacks.

* **Increased upfront time investment**: TDD may require a longer development cycle due to the creation of test cases, which can be time-consuming

* **Difficulty testing some code**: Certain types of code can be challenging or impossible to test using TDD, such as legacy code or code that relies on external systems

* **Over-reliance on testing**: TDD can create a culture where developers rely too much on testing, leading to a lack of focus on critical thinking and design

* **False sense of security**: TDD is not a silver bullet and doesn't guarantee bug-free software or full compliance with requirements

* **Maintenance challenges**: Maintaining a large suite of tests can be difficult, requiring ongoing updates and a solid understanding of the codebase and testing process

## References
* [_Test-Driven Development: By Example_ by Kent Beck](https://amzn.to/3KWnEf3)
* [test-driven-development-examples - GitHub Repo](https://github.com/brandoncardoso/test-driven-development-examples) - the examples from Kent Beck's _Test-Driven Development: By Example_ in typescript
* [_Professionalism and TDD (Reprise)_ by Robert C. Martin (Uncle Bob)](https://blog.cleancoder.com/uncle-bob/2014/05/02/ProfessionalismAndTDD.html)

