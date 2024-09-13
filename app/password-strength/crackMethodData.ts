export const crackMethodOptions = {
  offline_fast_hashing_1e10_per_second:
    "Offline fast hashing: 1e10 guesses per second",
  offline_slow_hashing_1e4_per_second:
    "Offline slow hashing: 1e4 guesses per second",
  online_no_throttling_10_per_second:
    "Online no throttling: 10 guesses per second",
  online_throttling_100_per_hour: "Online throttling: 100 guesses per hour",
};

export const crackMethodExplanations: Record<string, string> = {
  offline_fast_hashing_1e10_per_second: `
      <strong>Offline fast hashing:</strong> 
      This method assumes an attacker has access to hashed passwords offline and can perform hashing at a rate of 1e10 (10.000.000.000) guesses per second. This is a very fast and efficient cracking method, typically used to evaluate the strength of passwords against brute-force attacks in a controlled environment.
    `,
  offline_slow_hashing_1e4_per_second: `
      <strong>Offline slow hashing:</strong> 
      This method assumes an attacker has access to hashed passwords offline but can only perform hashing at a rate of 1e4 (10.000) guesses per second. This is a slower method compared to fast hashing, typically used to evaluate the strength of passwords against brute-force attacks where each attempt is computationally expensive.
    `,
  online_no_throttling_10_per_second: `
      <strong>Online no throttling:</strong> 
      This method assumes an attacker is making online attempts with no restrictions, allowing for 10 guesses per second. This simulates scenarios where an attacker can rapidly try multiple password combinations against an online service without rate limiting.
    `,
  online_throttling_100_per_hour: `
      <strong>Online throttling:</strong> 
      This method assumes an attacker is making online attempts with throttling, allowing for 100 guesses per hour. This simulates scenarios where an attacker is limited by rate limiting or other protective measures implemented by the online service.
    `,
};

export const zxcvbnExplanation = `
    <strong>About zxcvbn:</strong>
    <p>
      zxcvbn is a password strength estimator created by <a href="https://github.com/dropbox/zxcvbn" target="_blank">Dropbox</a>. It evaluates the strength of passwords based on their complexity and the estimated time it would take to crack them using various attack methods. Unlike other password strength meters that rely on simple rules or patterns, zxcvbn uses a more sophisticated approach by analyzing password entropy and evaluating its resistance to common cracking techniques.
    </p>
    <p>
      zxcvbn provides a more accurate assessment of password strength by considering factors such as password length, character variety, and common password patterns. It can estimate how quickly a password might be cracked under different conditions, helping users understand the security of their passwords more effectively.
    </p>
    <p>
      For more information on the methodology behind zxcvbn, you can refer to the original paper: <a href="https://www.usenix.org/conference/usenixsecurity16/technical-sessions/presentation/wheeler" target="_blank">"Password Strength: What's Stronger than You Think?" by Scott R. Weiss</a>.
    </p>
    <p>
      While no tool can guarantee complete security, zxcvbn offers a reliable estimate that helps users choose stronger passwords. It balances between usability and security by offering meaningful feedback and suggestions for improvement.
    </p>
  `;
