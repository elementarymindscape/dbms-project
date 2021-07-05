import React from 'react';
import {withRouter} from 'react-router-dom';

function ProfilePage() {
    return (
        <div>
            <h1>If you are here, you have been authenticated.</h1>
        </div>
    )
}

export default withRouter(ProfilePage);
