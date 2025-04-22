const Dashboard = document.getElementById("Dashboard");
const Alldonations = document.getElementById("Alldonations");
const Rewards = document.getElementById("Rewards");
const Profile = document.getElementById("Profile");
const sidebar = document.getElementById('dashboardSidebar');

const activeDonationsToggle=document.getElementById("activeDonationsToggle");
const dashboardToggle=document.getElementById("dashboardToggle")
const profileToggle=document.getElementById("profileToggle")
const historyDonationToggle=document.getElementById("historyDonationToggle")
Profile.classList.remove("hidden");
document.getElementById("dashboardToggle").addEventListener("click", () => {
  Dashboard.classList.remove("hidden");
  Alldonations.classList.add("hidden");
  Rewards.classList.add("hidden");
  Profile.classList.add("hidden");
  sidebar.classList.toggle('-translate-x-full');


});

document.getElementById("activeDonationsToggle").addEventListener("click", () => {
  Dashboard.classList.add("hidden");
  Alldonations.classList.remove("hidden");
  Rewards.classList.add("hidden");
  Profile.classList.add("hidden");
  sidebar.classList.toggle('-translate-x-full');

});
document.getElementById("historyDonationToggle").addEventListener("click", () => {
  Dashboard.classList.add("hidden");
  Alldonations.classList.add("hidden");
  Rewards.classList.remove("hidden");
  Profile.classList.add("hidden");
  sidebar.classList.toggle('-translate-x-full');



});
document.getElementById("profileToggle").addEventListener("click", () => {
  Dashboard.classList.add("hidden");
  Alldonations.classList.add("hidden");
  Rewards.classList.add("hidden");
  Profile.classList.remove("hidden");
  sidebar.classList.toggle('-translate-x-full');

});
