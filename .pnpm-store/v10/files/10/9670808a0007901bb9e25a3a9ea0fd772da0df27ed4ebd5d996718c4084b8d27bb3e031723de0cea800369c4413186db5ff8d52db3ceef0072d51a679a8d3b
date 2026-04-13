var hostReportErrors;
var hasRequiredHostReportErrors;

function requireHostReportErrors () {
	if (hasRequiredHostReportErrors) return hostReportErrors;
	hasRequiredHostReportErrors = 1;
	hostReportErrors = function (a, b) {
	  try {
	    // eslint-disable-next-line no-console -- safe
	    arguments.length === 1 ? (void 0) : (void 0);
	  } catch (error) { /* empty */ }
	};
	return hostReportErrors;
}

export { requireHostReportErrors as __require };
