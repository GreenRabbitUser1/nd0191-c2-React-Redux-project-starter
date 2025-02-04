import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { submitPollVote } from "../actions/polls";
import { BiSolidNavigation } from "react-icons/bi";
import { Link } from "react-router-dom";
import { getUsers } from "../actions/users";

const PollWidget = (props) => {

    const { poll, users, user, dispatch, pathname } = props;
    const [pollReady, setPollReady] = useState(false);
    const [pollSubmitting, setPollSubmitting] = useState(false);
    const [mixer, setMixer] = useState(Math.random(1) >= 0.5);

    useEffect(() => {
        //  When poll, users, and user are not null, begin data operations 
        //  Or when any change I.e. user answeres poll
        setPollReady(false);
        if (poll && poll !== null && users && users !== null && user && user !== null){
            setPollReady(true);
            setPollSubmitting(false);
        }

    }, [poll, users, users]);

    const handleAnswerPoll = (answer) => {
        console.log('User voted for an option');
        setPollSubmitting(true);
        setPollReady(false);
        setTimeout(async () => {
            await dispatch(submitPollVote(user, poll.id, answer));
            await dispatch(getUsers());
        }, 300);
    }

    const widthOptionOne = () => {
        if (poll.optionOne.votes.length == 0){
            return 0;
        }
        if (poll.optionOne.votes.length + poll.optionTwo.votes.length == 0){
            return 0;
        }
        return Math.round((poll.optionOne.votes.length / (poll.optionOne.votes.length + poll.optionTwo.votes.length)) * 100);
    }

    const widthOptionTwo = () => {
        if (poll.optionTwo.votes.length == 0){
            return 0;
        }
        if (poll.optionOne.votes.length + poll.optionTwo.votes.length == 0){
            return 0;
        }
        return Math.round((poll.optionTwo.votes.length / (poll.optionOne.votes.length + poll.optionTwo.votes.length)) * 100);
    }

    return (
        <div className="poll-widget-wrap">
            {
                pollSubmitting && 
                <div className="submitting-answer">
                    <div>Submitting Answer ...</div>
                    <br/>
                    <div>Thanks for participating in this poll!</div>
                </div>
            }
            {
                pollReady && 
                <>
                    <div className="poll-header">
                        <div className="poll-question">
                            Would you rather ... ?
                        </div>
                        {
                            !pathname && 
                            <Link to={`/question/${poll.id}`}>
                                <BiSolidNavigation className="widget-nav" />
                            </Link>
                        }
                    </div>
                    <div className="poll-body">
                        {
                            // User has not answered this poll yet
                            !(user.answers?.[poll.id]) && 
                            <div className="poll-options">
                                {/* Poll options are randomized when rendered to prevent bias */}
                                <div className="left-option">
                                    <button onClick={() => handleAnswerPoll(mixer ? 'optionOne' : 'optionTwo')} className="option-text">
                                        { mixer ? poll.optionOne.text : poll.optionTwo.text }
                                    </button>
                                </div>
                                <div>- or -</div>
                                <div className="right-option">
                                    <button onClick={() => handleAnswerPoll(mixer ? 'optionTwo' : 'optionOne')} className="option-text">
                                        { mixer ? poll.optionTwo.text : poll.optionOne.text }
                                    </button>
                                </div>
                            </div>
                        }
                        {
                            // User has answered this poll already
                            user.answers?.[poll.id] && 
                            <div className="poll-options">
                                <div className="option-answered">
                                    <div className="votes" style={{width: widthOptionOne() + '%'}} />
                                    <div className="option-text-wrap">
                                        <div className="poll-text">
                                            {poll.optionOne.text}
                                        </div>
                                        {
                                            (user.answers?.[poll.id] === 'optionOne') &&
                                            <div className="user-selected-answer">
                                                <IoCheckmarkCircleOutline title="You voted for this option" />
                                            </div>
                                        }
                                    </div>
                                    <div className="option-outcome">
                                        {poll.optionOne.votes.length + ' votes (' + widthOptionOne() + '%)'}
                                    </div>
                                </div>
                                <div>- or -</div>
                                <div className="option-answered">
                                    <div className="votes" style={{width: widthOptionTwo() + '%'}} />
                                    <div className="option-text-wrap">
                                        <div className="poll-text">
                                            {poll.optionTwo.text}
                                        </div>
                                        {
                                            (user.answers?.[poll.id] === 'optionTwo') &&
                                            <div className="user-selected-answer">
                                                <IoCheckmarkCircleOutline title="You voted for this option" />
                                            </div>
                                        }
                                    </div>
                                    <div className="option-outcome">
                                        {poll.optionTwo.votes.length + ' votes (' + widthOptionTwo() + '%)'}
                                    </div>
                                </div>
                            </div>
                        }
                        {
                            // (user.answers?.[poll.id]) &&
                            <div className="poll-author">
                                <label>Poll Created By: </label>
                                <div className="poll-author-wrap">
                                    <img className="poll-author-avatar" src={users[poll.author]?.avatarURL ? users[poll.author]?.avatarURL : null} />
                                    <div>
                                        { 
                                            users[poll.author]?.name
                                        }
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </>
            }
        </div>
    )
};

const mapStateToProps = (state) => ({
    users: state.users,
    user: state.user
})

export default connect(mapStateToProps)(PollWidget);