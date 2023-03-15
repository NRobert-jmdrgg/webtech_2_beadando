import { app } from '../index';
import { getLogs, getLogsAfter, getLogsBefore } from '../controllers/logs.controller';

app.get('logs/', getLogs);
app.get('logs/after/:after', getLogsAfter);
app.get('logs/before/:before', getLogsBefore);
