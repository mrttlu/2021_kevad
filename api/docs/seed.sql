USE excuses;

INSERT INTO users(firstName, lastName, email, password, role) VALUES
  ('Martti', 'Raavel', 'mrt@mrt.ee', '$2b$10$Dv7y5133dUL.DTiogU1bXeODhoEpuE.AsiiCdUmvQJwKHU57YISyW', 'Admin'),
  ('Juku', 'Juurikas', 'juku@juurikas.ee', '$2b$10$AkiS2VBzORkDESiXYOc2L.dFgZBykCDAnb5R1F41wp0sSfcPmhl9C', 'User');
INSERT INTO categories(description, createdById) VALUES
  ('Home', 1),
  ('Work', 2);
INSERT INTO excuses(description, categoryId, createdById, public) VALUES
  ('Ei tahtnud teha', 1, 1, 1),
  ('Ei osanud', 2, 1, 0),
  ('Ei viitsinud', 1, 2, 1),
  ('Ei teadnud, et oleks vaja midagi teha', 2, 2, 0);
INSERT INTO comments(content, excuseId, createdById) VALUES
  ('Suht igav vabandus', 1, 1),
  ('Kasutan seda vabandust iga päev', 1, 2),
  ('Matemaatikas väga kasutatav vabandus', 2, 1);