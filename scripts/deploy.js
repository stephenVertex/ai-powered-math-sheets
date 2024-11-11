const { execSync } = require('child_process');
const path = require('path');

const BUCKET_NAME = 'ai-powered-math-sheets';
const REGION = 'us-east-1';

try {
  // Build the app
  console.log('Building the app...');
  execSync('npm run build', { stdio: 'inherit' });

  // Deploy to S3
  console.log('Deploying to S3...');
  execSync(`aws s3 sync build/ s3://${BUCKET_NAME}`, { stdio: 'inherit' });

  console.log(`\nDeployment complete!`);
  console.log(`Your app is available at: http://${BUCKET_NAME}.s3-website-${REGION}.amazonaws.com`);
} catch (error) {
  console.error('Deployment failed:', error);
  process.exit(1);
} 