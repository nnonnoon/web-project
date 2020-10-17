import React from 'react';
import { message } from 'antd';
// import { CenterSpin } from '../../pages/customers/components/sharedComponents';
import { subDomain, redirectTo } from '../services/redirect';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const SpinIcon = ({ size }) => <Spin
    indicator={<LoadingOutlined
        style={{
            fontSize: size ? size : 24,
            color: 'black'
        }}
        spin
    />}
/>;

export const CenterSpin = ({ padding, height, size }) => <div
    style={{
        width: '100%',
        height: `${height ? height : '100%'}`,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: `${padding ? padding : padding === 0 ? 0 : '12rem 0'}`
    }}
>
    <SpinIcon size={size ? size : 100} />
</div>;

class loginRedirect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            redirect: '/',
        };
    }

    componentDidMount() {
        // const redirect = localStorage.getItem('last-page') || subDomain;
        const { accessToken, refreshToken } = this.props.match.params;
        if (accessToken && refreshToken) {
            localStorage.setItem('access-token', accessToken);
            localStorage.setItem('refresh-token', refreshToken);
            message.success('การเข้าสู่ระบบสำเร็จ');
            let secondsToGo = 1;
            const timer = setInterval(() => {
                secondsToGo -= 1;
            }, 1000);
            setTimeout(() => {
                clearInterval(timer);
                window.location = `${subDomain}/timesheet`
            }, secondsToGo * 1000);


        }else {
            message.error('การเข้าสู่ระบบไม่สำเร็จ');
            let secondsToGo = 1;
            const timer = setInterval(() => {
                secondsToGo -= 1;
            }, 1000);
            setTimeout(() => {
                clearInterval(timer);
                redirectTo('/login')
            }, secondsToGo * 1000);
        }
    }

    render() {
        return <CenterSpin height={'50rem'} />;
    }
}

export default loginRedirect;