<p align="center"><img src=".github/repository-banner.svg" alt="Election Education Assistant — An interactive civic-learning prototype" width="100%" /></p>

<p align="center"><a href="https://github.com/Janani-Balasubramanian">GitHub profile</a> · <a href="https://github.com/Janani-Balasubramanian/portfolio">Portfolio</a> · <a href="https://github.com/Janani-Balasubramanian/virtual_wars/issues">Issues</a></p>

# Election Education Assistant

A single-component React prototype created for Prompt Wars Virtual 2026. It explores voter journeys through persona-based guidance, checklists, timelines, a simulated voting interface, speech output, and an assistant chat.

## Explore

[`election_process_education_assistant.tsx`](election_process_education_assistant.tsx) contains the implementation, including the interface, sample data, and assistant request logic.

| Experience | What the component contains |
| --- | --- |
| Voter journeys | First-time, overseas, accessibility, and address-change personas |
| Preparation | Document checklists and a sample election timeline |
| Interactive learning | Simulated candidates and polling-process explanations |
| Assistant | Gemini request logic and browser speech synthesis |

## Integration status

This repository contains a TSX component rather than a complete installable application. It does not include `package.json`, a build configuration, or a server.

To integrate it, use a React + TypeScript host application, provide React and `lucide-react`, and render the component's default export. Review its styling requirements in the source. The Gemini API key is currently empty; real assistant responses require a configured integration. Keep production service credentials on a server rather than inside a public component.

## Demo boundaries

The timeline and candidates are demonstration data, not an official election schedule. Verify registration rules and deadlines with the relevant election authority. Google Calendar integration was listed as planned in the original project description; it is not presented here as a completed feature.
