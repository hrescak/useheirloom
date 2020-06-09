import {useUser} from '../../lib/hooks'

export const WithUser = WrappedComponent => {
    const Wrapper = props => {
        const user = useUser({ redirectTo: '/', redirectIfFound: false});
        return  <WrappedComponent {...props} user={user}/>
    }
    return Wrapper
}