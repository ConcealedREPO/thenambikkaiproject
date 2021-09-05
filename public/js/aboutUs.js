const members = [
  {
    "memberId" : 1,
    "member-image": "/images/founder.jpg",
    "name": "Dhivya Raviselvan",
    "role": "Founder",
    "bio": 
    `19 year old Malaysian student, founded The Nambikkai Project in March 2021. </br></br> In the months prior to the project’s conception, Malaysia and the rest of the world saw a drastic shift to online work and studies a challenge for individuals without access to electronic devices, or a stable internet connection. With Nambikkai, Dhivya and her team hope to bridge this gap by making technology and digital literacy accessible to all.</br></br> As a former school prefect and Student Council President at her college, Dhivya has experience organising events and managing a team and particularly enjoys rallying her community; encouraging participation in events and performances, and engaging in student welfare. She is currently pursuing her degree in Electrical Engineering and Information Technology at the Technical University of Munich.`
  },

  {
    "memberId" : 2,
    "member-image": "/images/hoga.jpg",
    "name": "Leo Tan Guang Hao",
    "role": "Head of General Affairs",
    "bio": 
    `A Tenby Schools SEP graduate who is waiting to attend university in September, who has been completing Neuroscience courses during lockdown in the meantime. As former student director of his school’s MUN CCA, is keenly interested in all manners of socioeconomic and cultural issues. He is especially concerned about the welfare of the underprivileged and underrepresented as he feels they are the cornerstones of our society, and hopes to be able to affect change in some small way through the Nambikkai Project! </br></br>Leo has prior experience organising events at school and national level as former Deputy Head Boy and Head of Eco Initiatives at Tenby; and has collaborated with a host of organisations ranging from Hospice Malaysia to WWF Malaysia. Aside from work, Leo likes to spend his time off reading, writing, playing music and football, and has self-taught himself how to play 5 different instruments. If you catch a rare sight of him out and about, discussions on football and interesting books and movies are always welcome!`
  },

  {
    "memberId" : 3,
    "member-image": "/images/adminPR.jpeg",
    "name": "Aabiraami Thillainathan",
    "role": "Administration and PR",
    "bio": 
    `As of September 2019, she is currently a law undergraduate at Brickfields Asia College (BAC) completing her transfer program. In addition to her curiosity in the legal field, her interests include tuning into self-help podcasts, cycling and travelling.`
  },

  {
    "memberId" : 4,
    "member-image": "/images/developer.jpg",
    "name": "Arun Alagusunthram",
    "role": "Web Developer",
    "bio": 
    `Currently a final year Computer Science undergraduate at Sunway University. With a passion in becoming a Web Developer and to be able to contribute to good endeavors, I joined THE NAMBIKKAI PROJECT and helped in developing the site that is active right now`
  },

  {
    "memberId" : 5,
    "member-image": "/images/designer.jpg",
    "name": "Bernice Loke",
    "role": "Graphic Designer",
    "bio": 
    `Currently a Product Design undergraduate who is excited to partake in The Nambikkai Project. She hopes she can use her design skills to make a difference for the underprivileged and underrepresented. Bernice has prior experience in being Head of Design teams for numerous events held at school and national level. While Bernice is not completing assignments, you can catch her reading webcomics and watching Valkyrae streams`
  },
  
]

const membersContainer = document.querySelector(".members")
const memberMakingTemplate = document.querySelector(".member-making-template")

export function populateMembers(){
  if(membersContainer === null || memberMakingTemplate === null) return
  createMember()
}

function createMember(){
  members.forEach(member => {
    const copyTemplate = memberMakingTemplate.content.cloneNode(true)

    const name = copyTemplate.querySelector("[data-name]")
    name.innerHTML = member.name

    const role = copyTemplate.querySelector("[data-role]")
    role.innerHTML = member.role
  
    const img = copyTemplate.querySelector("[data-profile-image]")
    img.src = member["member-image"]

    const bio = copyTemplate.querySelector("[data-bio]")
    bio.innerHTML = member.bio

    membersContainer.appendChild(copyTemplate)
  })
}


