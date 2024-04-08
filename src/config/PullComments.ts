export const PullComments: { key: string; message: string }[] = [
  {
    key: "Don't Ping Maintainers",
    message:
      "We realize you're looking to get help as soon as possible. Rather than pinging someone directly, which can be considered rude, would you mind [joining our Discord](https://discord.gg/KVUmVXA) and asking your question there? Someone might be more readily available to help."
  },
  {
    key: "Hacktoberfest requirements",
    message:
      "Thank you for submitting a pull request for Hacktoberfest. However, it appears that you have not followed the instructions provided in the Hacktoberfest issue thread or our other contributing guidelines. Please review them and make the necessary changes."
  },
  {
    key: "Merge Conflicts",
    message: `We would love to be able to merge your changes, but it looks like you have some merge conflicts. ⚠️\n\nOnce you resolve these conflicts, we will be able to review you rPR and merge it. 😊\n\n---\n\nIf you're not familiar with the merge conflict process, feel free to look over GitHub's guide on ["Resolving a merge conflict"](https://help.github.com/articles/resolving-a-merge-conflict-on-github/). 🔍️\n\nAlso, it's good practice on GitHub to write a brief description of your changes when creating a PR. 📝`
  },
  {
    key: "Duplicate PR",
    message: `This PR seems to make similar changes as an existing PR. As such, we are going to close this as a duplicate.\n\nIf you feel you have additional changes to expand upon this PR, please feel free to push your commits and request this PR be reopened.\n\nThanks again! 😊\n\n---\n\nIf you have any questions, feel free to ask questions on the ["Contributors" category on our forum](https://forum.freecodecamp.org/c/contributors) or [the contributors chat room](https://discord.gg/PRyKn3Vbay).`
  },
  {
    key: "External Resource Link",
    message:
      "Thank you for your pull request.\n\nWe are closing this pull request. Please suggest links and other details to add the challenge's corresponding guide post through [a forum topic](https://forum.freecodecamp.org/new-topic?category=Contributors&title=&body=**What%20is%20your%20hint%20or%20solution%20suggestion%3F**%0A%0A%0A%0A%0A**Challenge%3A**%0A%0A%0A**Link%20to%20the%20challenge%3A**) instead.\n\nIf you think we're wrong in closing this issue, please request for it to be reopened and add further clarification. Thank you and happy coding."
  },
  {
    key: "Newbie Mistakes",
    message:
      "Hello,\n\nFirstly, thank you for submitting this pull request!\n\nAs you navigate through the process, we have a PR checklist to ensure consistency and quality in our contributions. We kindly ask that you genuinely follow through with each point. This not only facilitates the review process but also demonstrates a mutual respect for the community's efforts.\n\nIf you're unfamiliar with certain aspects, our [contributing guidelines](https://contribute.freecodecamp.org) are a helpful resource to get you up to speed.\n\n<details>\n<summary>**Friendly Pointers (click to expand)**</summary>\n\n1. **Editing on GitHub:** While it's possible to edit files directly on GitHub, it's typically better not to. This helps avoid inadvertent mistakes like typos that can disrupt tests.\n\n2. **Pull Request Title:** Please ensure the PR title follows [our convention](https://contribute.freecodecamp.org/#/how-to-open-a-pull-request?id=prepare-a-good-pr-title).\n\n3. **Linking Issues:** Please ensure you link issues using the designated method. Simply update the `XXXXXX` in the PR description to include the issue number. This keeps our records organized and clear.\n\n4. **Engaging with the Team:** We know you're eager, but kindly keep mentions and review requests limited. Our maintainers are always on the lookout and will attend to PRs in the order they come in.\n\n5. **Branch Management:** It's a good practice not to work directly off your `main` branch. Creating separate branches for different changes allows you to smoothly update your PR even as the main repository progresses.\n\n</details>\n\nPlease note, there's no need to close this PR. If you have questions or need guidance refining your contribution, don't hesitate to ask. Our community is here to assist.\n\nThank you for your enthusiasm in contributing to our project. We eagerly await more contributions from you!\n\n**Happy Contributing!** 🌟"
  },
  {
    key: "Not Triaged",
    message:
      "Hi there,\n\nThanks for creating this pull request.\n\nThe linked issue has not been triaged yet, and a solution has not been agreed upon. Once the issue is open for contribution, you are welcome to update this pull request to reflect the issue consensus. Until the issue is open for contribution, we will not be able to review your pull request."
  },
  {
    key: "Related to Camper Code",
    message: `Thank you for reporting this issue.\n\nThis is a standard message notifying you that this issue seems to be a request for help. Instead of asking for help here, please click the **"Get Help"** button on the challenge on freeCodeCamp and choose the **"Ask for help"** option, which will help you create a question in the right part of the forum. Volunteers on the forum usually respond to questions within a few hours and can help determine if there is an issue with your code or the challenge's tests.\n\nIf the forum members determine there is nothing wrong with your code, you can request this issue to be reopened.\n\nThank you and happy coding.`
  },
  {
    key: "Fix in Progress",
    message:
      "Thank you for reporting this issue.\n\nThis is a standard message notifying you that the problem you mentioned here is present in production, but that it has already been fixed in staging. This means that the next time we push our staging branch to production, this problem should be fixed. Because of this, we're closing this issue.\n\nIf you think we're wrong in closing this issue, please request for it to be reopened and add further clarification. Thank you and happy coding."
  },
  {
    key: "Requests for Assignment",
    message:
      "We typically do not assign issues. Instead, we accept the first pull request that comprehensively solves the issue.\n\nIssues labelled with `help wanted` or `first timers only` are open for contributions.\n\nPlease make sure you read [our guidelines for contributing](https://contribute.freecodecamp.org/#/). We prioritize contributors following the instructions in our guide. Join us in [our chat room](https://discord.gg/PRyKn3Vbay) or [the forum](https://forum.freecodecamp.org/c/contributors/3) if you need help contributing - our community will be happy to assist you."
  },
  {
    key: "rtfm",
    message:
      "Please stop and read our contributing guide.\n\nhttps://contribute.freecodecamp.org/\n\nThis issue is not marked as ready for contributions or help wanted. Also, we do not assign issues."
  },
  {
    key: "Failing CI",
    message:
      "We would love to be able to merge your changes but it looks like there is an error with the CI build. ⚠️\n\nOnce you resolve these issues, we will be able to review your PR and merge it. 😊\n\n---\n\nFeel free to reference the [contributing guidelines](https://contribute.freecodecamp.org/#/how-to-work-on-coding-challenges.md#testing-challenges) for instructions on running the CI build locally. ✅"
  },
  {
    key: "Exercise PR Made Against Boilerplate Repo",
    message:
      "Hi there,\n\nIt looks like this PR was supposed to be made on your own fork instead of the original boilerplate repository.\n\nThis is a standard message notifying you that we've reviewed your pull request and have decided not to merge it. Join our [chat room](https://discord.gg/PRyKn3Vbay) or our [forum](https://forum.freecodecamp.org/) if you have any questions or need help with the coding challenges.\n\nHappy coding."
  }
];

export const PullClose = `Thank you for opening this pull request.

This is a standard message notifying you that we've reviewed your pull request and have decided not to merge it. We would welcome future pull requests from you.

Thank you and happy coding.
`;

export const IssueClose = `Thank you for reporting this issue.

This is a standard message notifying you that this issue is not on our roadmap at this time, and not something we plan to implement.

If you think we're wrong in closing this issue, please request for it to be reopened and add further clarification. Thank you and happy coding.`;
