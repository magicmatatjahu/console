import React from 'react';
import { Badge } from 'fundamental-react/Badge';

export default function LambdaStatusBadge({ status }) {
  let type;

  switch (status) {
    case 'Building':
    case 'Deploying':
    case 'Updating':
      type = 'default';
      break;
    case 'Running':
      type = 'success';
      break;
    case 'Unknown':
      type = 'warning';
      break;
    case 'Error':
      type = 'error';
      break;
    default:
      type = 'warning';
  }

  return <Badge type={type}>{status}</Badge>;
}
