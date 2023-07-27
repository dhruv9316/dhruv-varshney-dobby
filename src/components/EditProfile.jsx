import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setUser } from "../slices/authSlice"
import { apiConnector } from "../services/apiconnector"

const qualifications = ["Post Graduate", "Graduate", "Under Graduate",
                         "Intermediate ", "High School"]

export default function EditProfile() {
  const { token , user} = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm()

  const BASE_URL = process.env.REACT_APP_BASE_URL

  const updateProfile = (token, formData) => {
    return async (dispatch) => {
        
      const toastId = toast.loading("Loading...")

      try {
        const response = await apiConnector("PUT", BASE_URL + "/updateProfile", formData, {
          Authorization: `Bearer ${token}`,
        })

        console.log("update details API RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }

        const userPhoto = response.data.updatedUserDetails.photo
          ? response.data.updatedUserDetails.photo
          : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.firstName} ${response.data.updatedUserDetails.lastName}`
        dispatch(
          setUser({ ...response.data.updatedUserDetails, photo: userPhoto })
        )

        toast.success("Profile Updated Successfully")
        navigate("/dashboard");

      } catch (error) {
        console.log("update details API ERROR............", error)
        toast.error("Could Not Update Profile")
      }
      toast.dismiss(toastId)
    }
  }

  const submitProfileForm = async (data) => {
    // console.log("Form Data - ", data)
    try {
      dispatch(updateProfile(token, data))
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit(submitProfileForm)}>
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] p-8 px-12">
          <h2 className="text-lg font-semibold ">
            Profile Information
          </h2>
          <div className="flex gap-5 flex-row">
            <div className="flex flex-col gap-2 w-[48%]">
              <label htmlFor="firstName" className="lable-style">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter first name"
                className="form-style"
                {...register("firstName", { required: true })}
                defaultValue={user?.firstName}
              />
            </div>

            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="lastName" className="lable-style">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter Last name"
                className="form-style"
                {...register("lastName", { required: true })}
                defaultValue={user?.lastName}
              />
            </div>
          </div>

          <div className="flex gap-5 flex-row">

            <div className="flex flex-col gap-2 w-[48%]">
              <label htmlFor="email" className="lable-style">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                className="form-style"
                {...register("email", { required: true })}
                defaultValue={user.email}
              />
            </div>

            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="educationalQualification" className="lable-style">
                Qualifications
              </label>
              <select
                type="text"
                name="educationalQualification"
                id="educationalQualification"
                className="form-style"
                {...register("educationalQualification", { required: true })}
                defaultValue={user?.educationalQualification}
              >
                {qualifications.map((ele, i) => {
                  return (
                    <option key={i} value={ele}>
                      {ele}
                    </option>
                  )
                })}
              </select>
            </div>
          </div>

          <div className="flex gap-5 flex-row">

            <div className="flex flex-col gap-2 w-[48%]">
              <label htmlFor="skillSet" className="lable-style">
                Skill Set
              </label>
              <input
                type="text"
                name="skillSet"
                id="skillSet"
                placeholder="Enter your skill Set"
                className="form-style"
                {...register("skillSet", { required: true })}
                defaultValue={user?.skillSet}
              />
            </div>
            

            <div className="flex flex-col gap-2 w-[48%]">
              <label htmlFor="pastExperience" className="lable-style">
                Past Experience
              </label>
              <input
                type="text"
                name="pastExperience"
                id="pastExperience"
                placeholder="Enter your past Experience"
                className="form-style"
                {...register("pastExperience", { required: true })}
                defaultValue={user?.pastExperience}
              />
            </div>

          </div>
        </div>

        <div className="flex justify-center gap-2">
          <button
            onClick={() => {
              navigate("/dashboard")
            }}
            className="cursor-pointer rounded-md py-2 px-5 "
          >
            Cancel
          </button>

          <button type="submit" 
            className="cursor-pointer rounded-md py-2 px-5 font-extrabold ">
            Save
          </button>

        </div>
      </form>
    </>
  )
}