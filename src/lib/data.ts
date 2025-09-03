export type Tutor = {
  id: string;
  name: string;
  avatar: string;
  subjects: string[];
  rating: number;
  reviews: number;
  hourlyRate: number;
  bio: string;
  availability: Record<string, string[]>;
  experience: string;
  verified: boolean;
};

export const tutors: Tutor[] = [
  {
    id: "1",
    name: "Dr. Emily Carter",
    avatar: "https://picsum.photos/id/1027/200/200",
    subjects: ["Quantum Physics", "Astrophysics"],
    rating: 4.9,
    reviews: 120,
    hourlyRate: 75,
    bio: "PhD in Physics with over 10 years of experience in making complex topics understandable. My goal is to inspire a love for science.",
    availability: {
      Monday: ["10:00-12:00", "14:00-17:00"],
      Wednesday: ["09:00-11:00", "13:00-16:00"],
      Friday: ["10:00-13:00"],
    },
    experience: "10+ years university-level teaching",
    verified: true,
  },
  {
    id: "2",
    name: "Johnathan Smith",
    avatar: "https://picsum.photos/id/1005/200/200",
    subjects: ["Creative Writing", "English Literature"],
    rating: 4.8,
    reviews: 85,
    hourlyRate: 50,
    bio: "Published author and literature enthusiast. I help students find their voice and craft compelling narratives.",
    availability: {
      Tuesday: ["18:00-21:00"],
      Thursday: ["18:00-21:00"],
      Saturday: ["10:00-14:00"],
    },
    experience: "5 years of writing workshops",
    verified: true,
  },
  {
    id: "3",
    name: "Maria Garcia",
    avatar: "https://picsum.photos/id/1011/200/200",
    subjects: ["Spanish", "History of Art"],
    rating: 4.9,
    reviews: 98,
    hourlyRate: 60,
    bio: "Native Spanish speaker with a Master's in Art History. I love sharing the beauty of language and culture.",
    availability: {
      Monday: ["09:00-12:00"],
      Tuesday: ["14:00-17:00"],
      Thursday: ["09:00-12:00"],
    },
    experience: "8 years tutoring experience",
    verified: false,
  },
  {
    id: "4",
    name: "David Chen",
    avatar: "https://picsum.photos/id/1012/200/200",
    subjects: ["Data Structures", "Algorithms", "Java"],
    rating: 4.8,
    reviews: 210,
    hourlyRate: 80,
    bio: "Software engineer at a top tech company. I specialize in breaking down complex programming concepts and preparing students for technical interviews.",
    availability: {
      Wednesday: ["19:00-22:00"],
      Friday: ["19:00-22:00"],
      Sunday: ["13:00-18:00"],
    },
    experience: "Lead Software Engineer",
    verified: true,
  },
  {
    id: "5",
    name: "Aisha Khan",
    avatar: "https://picsum.photos/id/1025/200/200",
    subjects: ["Calculus", "Linear Algebra", "Statistics"],
    rating: 5.0,
    reviews: 150,
    hourlyRate: 70,
    bio: "Mathematics graduate with a passion for problem-solving. I provide clear, step-by-step explanations to build a strong mathematical foundation.",
    availability: {
      Tuesday: ["10:00-13:00", "15:00-18:00"],
      Thursday: ["10:00-13:00", "15:00-18:00"],
    },
    experience: "Former Math Olympiad Coach",
    verified: true,
  },
  {
    id: "6",
    name: "Ben Miller",
    avatar: "https://picsum.photos/id/1013/200/200",
    subjects: ["Chemistry", "Organic Chemistry"],
    rating: 4.7,
    reviews: 75,
    hourlyRate: 65,
    bio: "Chemistry PhD candidate focused on making chemistry intuitive and fun. Experienced in lab work and theoretical concepts.",
    availability: {
      Monday: ["17:00-20:00"],
      Wednesday: ["17:00-20:00"],
      Saturday: ["11:00-15:00"],
    },
    experience: "University Teaching Assistant",
    verified: false,
  },
];

export const conversations = [
    {
      id: "1",
      name: "Dr. Emily Carter",
      avatar: "https://picsum.photos/id/1027/200/200",
      lastMessage: "Great! Looking forward to our session on Wednesday.",
      lastMessageTime: "2h ago",
      unreadCount: 0,
    },
    {
      id: "2",
      name: "Johnathan Smith",
      avatar: "https://picsum.photos/id/1005/200/200",
      lastMessage: "I've reviewed your first chapter. Let's discuss...",
      lastMessageTime: "1d ago",
      unreadCount: 2,
    },
    {
        id: "4",
        name: "David Chen",
        avatar: "https://picsum.photos/id/1012/200/200",
        lastMessage: "Yes, that's the correct approach for the algorithm.",
        lastMessageTime: "3d ago",
        unreadCount: 1,
      },
      {
        id: "5",
        name: "Aisha Khan",
        avatar: "https://picsum.photos/id/1025/200/200",
        lastMessage: "Can you send over the practice problems you're stuck on?",
        lastMessageTime: "5d ago",
        unreadCount: 0,
      },
];

export const messages = {
    "1": [
      { id: "a", from: "other", text: "Hi! Just confirming our Quantum Physics session for tomorrow at 2 PM. Is that still good for you?", timestamp: "Yesterday 1:45 PM" },
      { id: "b", from: "me", text: "Yes, absolutely! I've been going over the chapter on wave-particle duality and had a few questions.", timestamp: "Yesterday 1:46 PM" },
      { id: "c", from: "other", text: "Great! Looking forward to our session on Wednesday.", timestamp: "Yesterday 1:47 PM" }
    ],
    "2": [
        { id: "d", from: "other", text: "Hi there, I've had a chance to read through the first chapter you sent over. Some really great ideas in there!", timestamp: "1d ago" },
        { id: "e", from: "other", text: "I've made a few notes. We can go over them in our next session.", timestamp: "1d ago" }
    ],
    "4": [
        { id: "f", from: "other", text: "Yes, that's the correct approach for the algorithm.", timestamp: "3d ago" },
    ],
    "5": [
        { id: "g", from: "me", text: "Hi Aisha, I'm struggling with some of the Calculus problems.", timestamp: "5d ago" },
        { id: "h", from: "other", text: "No problem. Can you send over the practice problems you're stuck on?", timestamp: "5d ago" },
    ]
  };

export const sessions = [
    {
      id: "s1",
      tutor: tutors[0],
      subject: "Quantum Physics",
      date: "2024-07-22T14:00:00Z",
      status: "upcoming"
    },
    {
      id: "s2",
      tutor: tutors[1],
      subject: "Creative Writing",
      date: "2024-07-24T10:30:00Z",
      status: "upcoming"
    },
    {
      id: "s3",
      tutor: tutors[4],
      subject: "Calculus",
      date: "2024-07-15T11:00:00Z",
      status: "completed"
    },
    {
      id: "s4",
      tutor: tutors[3],
      subject: "Data Structures",
      date: "2024-07-12T19:00:00Z",
      status: "completed"
    },
    {
      id: "s5",
      tutor: tutors[0],
      subject: "Astrophysics",
      date: "2024-07-08T14:00:00Z",
      status: "completed"
    },
      {
      id: "s6",
      tutor: tutors[2],
      subject: "History of Art",
      date: "2024-07-29T09:00:00Z",
      status: "upcoming"
    }
  ];
