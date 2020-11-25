import React from "react";

import cogoToast from "cogo-toast";

export const notistackSuccess = message => cogoToast.success(message);

export const notistackError = message => cogoToast.error(message);
