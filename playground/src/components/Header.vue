<template>
  <header class="header">
    <nav class="menu">
      <ul>
        <li>
          <NuxtLink to="/" class="menu__item">CurioVerso</NuxtLink>
        </li>
        <div class="menu__right">
          <li>
            <NuxtLink to="/" class="menu__item">All Post</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/about" class="menu__item">About</NuxtLink>
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
