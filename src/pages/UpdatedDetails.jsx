import ChangeProfilePicture from "../components/ChangeProfilePicture"
import EditProfile from "../components/EditProfile"

export default function UpdatedDetails() {
  return (
    <>
      <h1 className="mb-14 text-3xl font-medium mx-auto pt-4">
        Edit Profile
      </h1>
      <ChangeProfilePicture />

      <EditProfile />
    </>
  )
}