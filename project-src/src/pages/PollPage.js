import { useLocation } from "react-router-dom";
import PollWidget from "../components/PollWidget";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PollPage = (props) => {

    const {polls} = props;

    const location = useLocation();
    const regex = /(?<=question\/)([^\/?#&]+)/;
    const [pollId, setPollId] = useState('');
    const [pollExists, setPollExists] = useState(true);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        let path = location.pathname;
        let match = path.match(regex);
        match = match ? match[0] : null;
        if (match && match !== null){
            setPollId(match);
        }
    }, [])

    useEffect(() => {
        if (!polls || polls.length === 0 || !pollId){
            return;
        }
        console.log('pollId changed: ', pollId);
        //  Check if the pollId is a valid ID
            //  If not, display that it is an invalid Poll ID
        if (polls[pollId] === null || polls[pollId] === undefined){
            console.log('polls[pollId]', polls[pollId]);
            setPollExists(false);
        }
        else {
            setPollExists(true);
        }
        setIsReady(true);
    }, [pollId, polls])


    return (
        <div className="poll-page-widget-wrap">
            {
                !isReady && 
                <div>Loading Poll Details ...</div>
            }
            {
                isReady && pollExists &&
                <PollWidget poll={polls[pollId]} pathname={pollId} />
            }
            {
                isReady && !pollExists && 
                <div>
                    <div>This poll does not exist.</div>
                    <div>Please verify that the ID of the poll in the URL is correct</div>
                    <Link to="/">Click Here to Go Home</Link>
                </div>
            }
        </div>
    )
};

const mapStateToProps = (state) => ({
    polls: state.polls
})

export default connect(mapStateToProps)(PollPage);