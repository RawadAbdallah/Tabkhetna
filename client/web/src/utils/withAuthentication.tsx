import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkAuthentication } from '@utils/helpers';

const withAuthentication = (WrappedComponent: React.FC) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (props: any) => {
    const navigate = useNavigate();

    useEffect(() => {
      if (!checkAuthentication()) {
        navigate('/unauthorized')
      }
    }, [navigate]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuthentication;
