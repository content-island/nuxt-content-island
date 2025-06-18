<template>
  <header class="header">
    <nav class="menu">
      <ul>
        <li>
          <a href="/" class="menu__item"> CurioVerso </a>
        </li>
        <div class="menu__right">
          <li>
            <a href="/" class="menu__item"> All Post </a>
          </li>
          <li>
            <a href="/about/" class="menu__item"> About </a>
          </li>
        </div>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.header {
  background-color: var(--primary-color);
  color: var(--text-color-light);
  padding: var(--fs-xs);
  text-align: center;
  position: sticky;
  top: 0;
  z-index: 1;
}

.menu ul {
  display: flex;
  justify-content: space-between;
  list-style: none;
}

.menu__item {
  color: var(--text-color-light);
  text-decoration: none;
  transition: color 0.3s ease-in-out;
}
.menu__item:hover,
.menu__item:active,
.menu__item:focus {
  color: var(--menu-hover-color);
}

.menu__right {
  display: flex;
  gap: var(--space-md);
}
</style>
