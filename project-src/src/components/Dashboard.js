import { useEffect } from "react";
import { getPolls } from "../actions/polls";
import { connect } from "react-redux";
import PollWidget from "./PollWidget";

const Dashboard = (props) => {

    const {polls, dispatch} = props;

    useEffect(() => {
        console.log('polls changed!', polls);
    }, [polls])

    useEffect(() => {
        //  Get all the active polls/questions and create <PollWidget />'s
        async function fetchPolls(){
            await dispatch(getPolls());
        }
        fetchPolls();
    }, []);

    return (
        <div className="polls">
            {
                polls &&
                Object.keys(polls).map((p) => {
                    console.log('Object.keys(polls) --> p --> ', p);
                    return (
                        <PollWidget poll={polls[p]} key={p} />
                    ) 
                })
            }
        </div>
    );
};

const mapStateToProps = (state) => ({
    polls: state.polls
});

export default connect(mapStateToProps)(Dashboard);