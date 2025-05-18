export const mockNotes = [
  {
    id: "1",
    title: "Meeting Notes",
    content: {
      time: 1689345600000,
      blocks: [
        {
          id: "abc1",
          type: "header",
          data: { text: "Project Meeting", level: 2 },
        },
        {
          id: "def2",
          type: "paragraph",
          data: {
            text: "Today we discussed the project timeline and next steps for implementation.",
          },
        },
      ],
      version: "2.25.0",
    },
    createdAt: "2023-07-15T10:30:00Z",
    updatedAt: "2023-07-15T11:45:00Z",
    authorId: 8,
  },
  {
    id: "2",
    title: "Private Tasks",
    content: {
      time: 1689432000000,
      blocks: [
        { id: "ghi3", type: "header", data: { text: "To-Do List", level: 2 } },
        {
          id: "jkl4",
          type: "paragraph",
          data: {
            text: "1. Call John 2. Review proposal 3. Send email to team",
          },
        },
      ],
      version: "2.25.0",
    },
    createdAt: "2023-07-16T09:15:00Z",
    updatedAt: "2023-07-16T14:20:00Z",
    authorId: 8,
  },
  {
    id: "3",
    title: "Project Ideas",
    content: {
      time: 1689518400000,
      blocks: [
        { id: "mno5", type: "header", data: { text: "App Concept", level: 2 } },
        {
          id: "pqr6",
          type: "paragraph",
          data: {
            text: "Create a mobile app for tracking daily habits and productivity",
          },
        },
      ],
      version: "2.25.0",
    },
    createdAt: "2023-07-17T11:00:00Z",
    updatedAt: "2023-07-17T16:30:00Z",
    authorId: 8,
  },
  {
    id: "4",
    title: "Team Updates",
    content: {
      time: 1689604800000,
      blocks: [
        {
          id: "stu7",
          type: "header",
          data: { text: "New Team Members", level: 2 },
        },
        {
          id: "vwx8",
          type: "paragraph",
          data: {
            text: "New team members will be joining next month. Prepare onboarding materials.",
          },
        },
      ],
      version: "2.25.0",
    },
    createdAt: "2023-07-18T13:45:00Z",
    updatedAt: "2023-07-18T15:20:00Z",
    authorId: 8,
  },
  {
    id: "5",
    title: "Secret Project",
    content: {
      time: 1689691200000,
      blocks: [
        { id: "yz91", type: "header", data: { text: "Launch Plan", level: 2 } },
        {
          id: "ab02",
          type: "paragraph",
          data: {
            text: "The launch date is set for next quarter. Prepare marketing materials.",
          },
        },
      ],
      version: "2.25.0",
    },
    createdAt: "2023-07-19T08:30:00Z",
    updatedAt: "2023-07-19T10:15:00Z",
    authorId: 8,
  },
{
    id: "6",
    title: "Learning Resources",
    content: {
      time: 1689777600000,
      blocks: [
        {
          id: "cd34",
          type: "header",
          data: { text: "Web Development", level: 2 },
        },
        {
          id: "ef56",
          type: "paragraph",
          data: {
            text: "Bookmarked tutorials and courses for React and TypeScript.",
          },
        },
      ],
      version: "2.25.0",
    },
    createdAt: "2023-07-20T14:00:00Z",
    updatedAt: "2023-07-20T16:45:00Z",
    authorId: 8,
  },
];

export default mockNotes;
