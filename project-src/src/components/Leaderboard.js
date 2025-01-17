import { useEffect, useState } from "react";
import { connect } from "react-redux";

const Leaderboard = (props) => {

    const {users, user} = props;

    //  Create a table users X poll activity

    const [readUsers, setReadUsers] = useState([]);
    let tempUsers = [];

    function sortUsers(){
        tempUsers = [];
        Object.keys(users).map((u) => {
            tempUsers.push(users[u]);
        });
        tempUsers = tempUsers.sort((a, b) => {
            if ((b.questions.length + Object.keys(b.answers).length) > 
                (a.questions.length + Object.keys(a.answers).length)){
                    return 1
            }
            if ((b.questions.length + Object.keys(b.answers).length) < 
                (a.questions.length + Object.keys(a.answers).length)){
                    return -1
            }
            return 0;
        });
        setReadUsers(tempUsers);
    }

    useEffect(() => {
        sortUsers();
    }, [users]);

    useEffect(() => {
        if (users && users !== null){
            sortUsers();
        }
    }, []);

    return (
        <div className="leaderboard-table-wrap">
            <table className="leaderboard-table">
                <thead>
                    <tr>
                        <th>
                            User
                        </th>
                        <th>
                            Polls Created
                        </th>
                        <th>
                            Polls Answered
                        </th>
                        <th>
                            Total
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users && 
                        readUsers.map((u) => {
                            return (
                                <tr key={u.id} className={u.id === user.id ? 'leaderboard-current-user' : ''}>
                                    <td>
                                        <div className="leaderboard-user-wrap">
                                            <img src={u.avatarURL} />
                                            <div>
                                                {u.name}
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {
                                            u.questions.length
                                        }
                                    </td>
                                    <td>
                                        {
                                            Object.keys(u.answers).length
                                        }
                                    </td>
                                    <td>
                                        {
                                            u.questions.length + Object.keys(u.answers).length
                                        }
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
};

const mapStateToProps = (state) => ({
    users: state.users,
    user: state.user
})

export default connect(mapStateToProps)(Leaderboard);