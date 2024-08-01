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

export const taskStatuses = ["Open", "In Progress", "Completed", "Closed"];
export const taskDefaultValues = {
  title: "",
  description: "",
  status: "Open",
  deadline: new Date(),
  assignee: "",
  event: "",
};
