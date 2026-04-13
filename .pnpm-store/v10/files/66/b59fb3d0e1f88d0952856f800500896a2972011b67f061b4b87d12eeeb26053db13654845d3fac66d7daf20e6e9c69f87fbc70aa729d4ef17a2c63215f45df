import process from 'node:process';

const ASCII_ETX_CODE = 0x03; // Ctrl+C

class StdinDiscarder {
	#activeCount = 0;
	#stdin;
	#stdinWasPaused = false;
	#stdinWasRaw = false;
	#handleInputBound = chunk => {
		if (!chunk?.length) {
			return;
		}

		const code = typeof chunk === 'string' ? chunk.codePointAt(0) : chunk[0];
		if (code === ASCII_ETX_CODE) {
			if (process.listenerCount('SIGINT') > 0) {
				process.emit('SIGINT');
			} else {
				process.kill(process.pid, 'SIGINT');
			}
		}
	};

	start() {
		this.#activeCount++;
		if (this.#activeCount === 1) {
			this.#realStart();
		}
	}

	stop() {
		if (this.#activeCount === 0) {
			return;
		}

		if (--this.#activeCount === 0) {
			this.#realStop();
		}
	}

	#realStart() {
		const {stdin} = process;

		if (process.platform === 'win32' || !stdin?.isTTY || typeof stdin.setRawMode !== 'function') {
			this.#stdin = undefined;
			return;
		}

		this.#stdin = stdin;
		this.#stdinWasPaused = stdin.isPaused();
		this.#stdinWasRaw = Boolean(stdin.isRaw);

		stdin.setRawMode(true);
		stdin.prependListener('data', this.#handleInputBound);

		if (this.#stdinWasPaused) {
			stdin.resume();
		}
	}

	#realStop() {
		if (!this.#stdin) {
			return;
		}

		const stdin = this.#stdin;

		stdin.off('data', this.#handleInputBound);

		if (stdin.isTTY) {
			stdin.setRawMode?.(this.#stdinWasRaw);
		}

		if (this.#stdinWasPaused) {
			stdin.pause();
		}

		this.#stdin = undefined;
		this.#stdinWasPaused = false;
		this.#stdinWasRaw = false;
	}
}

const stdinDiscarder = new StdinDiscarder();

export default Object.freeze(stdinDiscarder);
