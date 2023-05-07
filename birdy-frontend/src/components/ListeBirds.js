import Bird from "./Bird"

export default function ListeBirds({ birds }) {
    return (
        <ul>
            {
                birds.map((b) =>
                    <li key={b._id}>
                        <Bird
                            idBird= {b._id}
                            pseudo= {b.pseudo}
                            avatar= {b.avatar}
                            content= {b.content}
                            date= {b.date}
                            heure= {b.heure}
                            isPublic= {b.isPublic}
                            isComment= {b.isComment}
                            isRebird= {b.isRebird}
                            likes= {b.likes}
                            rebirds= {b.rebirds}
                            favorites= {b.favorites}
                        />
                    </li>
                )
            }
        </ul>
    )
}