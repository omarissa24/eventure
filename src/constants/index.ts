import { title } from "process";

export const organizerHeaderLinks = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "Create Event",
    route: "/events/create",
  },
  {
    label: "Events",
    route: "/events",
  },
  {
    label: "Tasks",
    route: "/tasks",
  },
  {
    label: "My Profile",
    route: "/profile",
  },
];

export const adminHeaderLinks = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "Events",
    route: "/events",
  },
  {
    label: "Users",
    route: "/users",
  },
  {
    label: "My Profile",
    route: "/profile",
  },
];

export const customerHeaderLinks = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "Events",
    route: "/events",
  },
  {
    label: "My Profile",
    route: "/profile",
  },
];

export const eventDefaultValues = {
  title: "",
  description: "",
  location: "",
  imageUrl: "",
  startDateTime: new Date(),
  endDateTime: new Date(),
  categoryId: "",
  price: "",
  isFree: false,
  url: "",
};

export const taskStatuses = [
  {
    _id: "Open",
    title: "Open",
  },
  {
    _id: "In Progress",
    title: "In Progress",
  },
  {
    _id: "Completed",
    title: "Completed",
  },
  {
    _id: "Closed",
    title: "Closed",
  },
];
export const taskDefaultValues = {
  title: "",
  description: "",
  status: "",
  deadline: new Date(),
  assignee: "",
  event: "",
};
