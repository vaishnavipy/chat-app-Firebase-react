


export default function getInitials(name) {

if(name){
    let splitName = name.split(" ");
    let initials =""

    splitName.forEach(elm => {

        initials += elm[0]
    })

    return initials.toUpperCase()
}

}