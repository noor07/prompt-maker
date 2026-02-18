import app from './app';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Try loading .env from current directory
const result = dotenv.config();

// If that failed, try loading from parent directory (useful when running from dist/)
if (result.error) {
    dotenv.config({ path: path.resolve(__dirname, '../.env') });
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
