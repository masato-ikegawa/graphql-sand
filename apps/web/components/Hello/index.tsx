import { HelloPresentation } from './components';

export default function HelloContainer() {
  const message = 'Hello from Next.js 14 Page Router!';
  return <HelloPresentation message={message} />;
}
