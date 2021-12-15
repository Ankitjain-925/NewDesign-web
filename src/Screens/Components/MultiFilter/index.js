import { data } from "jquery"

export const MultiFilter = (user, assignedTo, Speciality, fullData) => {
    let fullarray = []

    const assignedToFunc = (array1) => {
        let assignedToNew = []
        assignedToNew = assignedTo.map((item) => {
            return item?.value
        })

        let fullarray2 = []
        let list = []
        let array2 = array1.filter((item) => {
            assignedToNew.includes(item.assinged_to.map((item) => {
                list.push(item.user_id)
            }))
            return list
        })
        if (Speciality && Speciality.length > 0) {
            var spec = SpecialityFunc(array2)
            return spec;
        }
        else {
            return array2;
        }

    }
    const SpecialityFunc = (array2) => {
        let SpecialityNew = []
        SpecialityNew = Speciality.map((item) => {
            return item?.value
        })

        let array3 = array2.filter((item) => SpecialityNew.includes(item?.speciality?._id))
        return array3;
    }
    const userFunc = () => {
        if (user && user.length > 0) {
            let usersNew = []
            usersNew = user.map((item) => {
                return item?.profile_id
            })
            var array1 = fullData.filter((item) => usersNew.includes(item?.patient?.profile_id))
            if (assignedTo && assignedTo.length > 0) {
                var assigned = assignedToFunc(array1)
                return assigned;
            }
            else if (Speciality && Speciality.length > 0) {
                var spec1 = SpecialityFunc(array1)
                return spec1;
            }
            else {
                return array1;
            }
        }
        else if (assignedTo && assignedTo.length > 0) {
            var assig = assignedToFunc(fullData)
            return assig;
        }
        else if (Speciality && Speciality.length > 0) {
            var spec2 = SpecialityFunc(fullData)
            return spec2;
        }
        else {
            return fullData;
        }
    }

    var findData = userFunc(fullData)
    return findData;
}




export const AppointFilter = (user, Speciality, Choosetask, fullData) => {
    console.log("user", user, "Speciality", Speciality, "Choosetask", Choosetask)

    // const ChoosetaskFunc = (array1) => {
    //     let assignedToNew = []
    //     assignedToNew = assignedTo.map((item) => {
    //         return item?.value
    //     })

    //     let fullarray2 = []
    //     let list = []
    //     let array2 = array1.filter((item) => {
    //         assignedToNew.includes(item.assinged_to.map((item) => {
    //             list.push(item.user_id)
    //         }))
    //         return list
    //     })
    //     if (Speciality && Speciality.length > 0) {
    //         var spec = SpecialityFunc(array2)
    //         return spec;
    //     }
    //     else {
    //         return array2;
    //     }

    // }

    const SpecialityFunc = (array2) => {
        let SpecialityNew = []
        SpecialityNew = Speciality.map((item) => {
            return item?.value
        })

        let array3 = array2.filter((item) => SpecialityNew.includes(item?.speciality?._id))
        return array3;
    }

    const userFunc = () => {
        if (user && user.length > 0) {
            let usersNew = []
            usersNew = user.map((item) => {
                return item?.profile_id

            })
            var array1 = fullData.filter((item) => usersNew.includes(item?.patient?.profile_id))
            if (Speciality && Speciality.length > 0) {
                var spec1 = SpecialityFunc(array1)
                return spec1;
            }
            // else if (Choosetask && Choosetask.length > 0) {
            //     var task1 = ChoosetaskFunc(array1)
            //     return task1;
            // }
            else {
                return array1;
            }
        }
        else if (Speciality && Speciality.length > 0) {
            var spec1 = SpecialityFunc(array1)
            return spec1;
        }
        // else if (Choosetask && Choosetask.length > 0) {
        //     var task1 = ChoosetaskFunc(array1)
        //     return task1;
        // }
        else {
            return fullData;
        }
    }
    var findData = userFunc(fullData)
    return findData;
}

export const MultiFilter2 = (users, specialities, statusValue, fullData) => {
    let user = users
    let Speciality = specialities
    let status = statusValue
    
    const statusFunc = (array1) => {
        let stats = []
        stats = stats.map((item) => {
            return item?.value
        })
        let array2 = array1.filter((item) => {
            stats.includes(item?.status?.label)
        })
        return array2;
    }

    // const SpecialityFunc = (array1) => {
    //     // let SpecialityNew = []
    //     // SpecialityNew = Speciality.map((item) => {
    //     //     return item?.value
    //     // })

    //     // let array3 = array1.filter((item) => SpecialityNew.includes(item?.speciality?._id))
    //     return array1;
    // }
    const userFunc = (status) => {
        if (user && user.length > 0) {
            let usersNew = []
            usersNew = user.map((item) => {
                return item?.value
            })
            var array1 = fullData.filter((item) => usersNew.includes(item?.patient?.profile_id))
            if (status && status.length > 0) {
                var status = statusFunc(array1)
                return status;
            }
            else {
                return array1;
            }
        }

        else if (status && status.length > 0) {
            var stat = statusFunc(fullData)
            return stat;
        }
        else {
            return fullData;
        }
    }
    var findData = userFunc(fullData)
    return findData;

}

