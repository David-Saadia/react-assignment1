import {useEffect, useState} from "react";	


import CardForm from "../CardForm/CardForm";
import CardTable from "../CardTable/CardTable";

import "../utils.css";
import "./Home.css";
import bg from "../../assets/images/scrollableBackground.png";
import NavigationBar from "../base-components/NavigationBar/NavigationBar";

export default function Home() {

    const [dummyUsers, setDummyUsers] = useState([]);
    const [loading, setLoading] = useState(true);



    useEffect(() => { 
        const fetchUsers = async () => {
            try {
                const totalPages = 2;
                const fetches =[];
                for (let i = 1; i <= totalPages; i++) {
                    const path = `https://reqres.in/api/users?page=${i}`;
                    fetches.push(fetch(path).then(response => response.json()));
                    console.log(path);
                }
                const data = await Promise.all(fetches);
                setDummyUsers(data.flatMap(page =>
                    page.data.map(user=> ({
                        name: `${user.first_name} ${user.last_name}`,
                        avatar: user.avatar
                    }))
                ));
                console.log("Actors added....!!!");
                setLoading(false);

            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        }

        fetchUsers();
        //Setting page general attributes
        document.title = "Home Page";
        document.body.style.backgroundImage = `url(${bg})`; ;
        
        document.body.style.backgroundPosition = "top center";
        document.body.style.backgroundSize = "cover"; // This fills the entire screen
        document.body.style.backgroundRepeat = "repeat-y";
        document.body.style.backgroundAttachment = "scroll";
        document.body.style.margin= "0";
        document.body.style.padding= "0";

    }, []);
    

    if(loading) return <div>Loading...</div>;


    return (
        <div className="home">
            <NavigationBar/>
            <div className="page-container">
                <CardForm styleClass="card-form" addRow={(name, avatar) =>{
                    const newRow = { name: name, avatar: avatar };
                    setDummyUsers(prev => [...prev, newRow]);
                    } }/>
                <CardTable tableTitle= "Our Team" styleClass="card-table" rows={dummyUsers}/> 
            </div>
        </div>
    );
}