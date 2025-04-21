const Dashboard = document.getElementById("Dashboard");
const Alldonations = document.getElementById("Alldonations");
const Rewards = document.getElementById("Rewards");
const Profile = document.getElementById("Profile");

const alldonationsToggle=document.getElementById("alldonationsToggle");
const dashboardToggle=document.getElementById("dashboardToggle")
const profileToggle=document.getElementById("profileToggle")
const rewardsToggle=document.getElementById("rewardsToggle")

document.getElementById("dashboardToggle").addEventListener("click", () => {
  Dashboard.classList.remove("hidden");
  Alldonations.classList.add("hidden");
  Rewards.classList.add("hidden");
  Profile.classList.add("hidden");
  dashboardToggle.classList.add("bg-datelink","text-white");
  alldonationsToggle.classList.remove("bg-datelink","text-white");
  profileToggle.classList.remove("bg-datelink","text-white");
  rewardsToggle.classList.remove("bg-datelink","text-white");

});

document.getElementById("alldonationsToggle").addEventListener("click", () => {
  Dashboard.classList.add("hidden");
  Alldonations.classList.remove("hidden");
  Rewards.classList.add("hidden");
  Profile.classList.add("hidden");
  dashboardToggle.classList.remove("bg-datelink","text-white");
  alldonationsToggle.classList.add("bg-datelink","text-white");
  profileToggle.classList.remove("bg-datelink","text-white");
  rewardsToggle.classList.remove("bg-datelink","text-white");
});
document.getElementById("rewardsToggle").addEventListener("click", () => {
  Dashboard.classList.add("hidden");
  Alldonations.classList.add("hidden");
  Rewards.classList.remove("hidden");
  Profile.classList.add("hidden");
  dashboardToggle.classList.remove("bg-datelink","text-white");
  alldonationsToggle.classList.remove("bg-datelink","text-white");
  profileToggle.classList.remove("bg-datelink","text-white");
  rewardsToggle.classList.add("bg-datelink","text-white");

});
document.getElementById("profileToggle").addEventListener("click", () => {
  Dashboard.classList.add("hidden");
  Alldonations.classList.add("hidden");
  Rewards.classList.add("hidden");
  Profile.classList.remove("hidden");
  dashboardToggle.classList.remove("bg-datelink","text-white");
  alldonationsToggle.classList.remove("bg-datelink","text-white");
  profileToggle.classList.add("bg-datelink","text-white");
  rewardsToggle.classList.remove("bg-datelink","text-white");
});
