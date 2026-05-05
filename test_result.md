#====================================================================================================
# START - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================

# THIS SECTION CONTAINS CRITICAL TESTING INSTRUCTIONS FOR BOTH AGENTS
# BOTH MAIN_AGENT AND TESTING_AGENT MUST PRESERVE THIS ENTIRE BLOCK

# Communication Protocol:
# If the `testing_agent` is available, main agent should delegate all testing tasks to it.
#
# You have access to a file called `test_result.md`. This file contains the complete testing state
# and history, and is the primary means of communication between main and the testing agent.
#
# Main and testing agents must follow this exact format to maintain testing data. 
# The testing data must be entered in yaml format Below is the data structure:
# 
## user_problem_statement: {problem_statement}
## backend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.py"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## frontend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.js"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## metadata:
##   created_by: "main_agent"
##   version: "1.0"
##   test_sequence: 0
##   run_ui: false
##
## test_plan:
##   current_focus:
##     - "Task name 1"
##     - "Task name 2"
##   stuck_tasks:
##     - "Task name with persistent issues"
##   test_all: false
##   test_priority: "high_first"  # or "sequential" or "stuck_first"
##
## agent_communication:
##     -agent: "main"  # or "testing" or "user"
##     -message: "Communication message between agents"

# Protocol Guidelines for Main agent
#
# 1. Update Test Result File Before Testing:
#    - Main agent must always update the `test_result.md` file before calling the testing agent
#    - Add implementation details to the status_history
#    - Set `needs_retesting` to true for tasks that need testing
#    - Update the `test_plan` section to guide testing priorities
#    - Add a message to `agent_communication` explaining what you've done
#
# 2. Incorporate User Feedback:
#    - When a user provides feedback that something is or isn't working, add this information to the relevant task's status_history
#    - Update the working status based on user feedback
#    - If a user reports an issue with a task that was marked as working, increment the stuck_count
#    - Whenever user reports issue in the app, if we have testing agent and task_result.md file so find the appropriate task for that and append in status_history of that task to contain the user concern and problem as well 
#
# 3. Track Stuck Tasks:
#    - Monitor which tasks have high stuck_count values or where you are fixing same issue again and again, analyze that when you read task_result.md
#    - For persistent issues, use websearch tool to find solutions
#    - Pay special attention to tasks in the stuck_tasks list
#    - When you fix an issue with a stuck task, don't reset the stuck_count until the testing agent confirms it's working
#
# 4. Provide Context to Testing Agent:
#    - When calling the testing agent, provide clear instructions about:
#      - Which tasks need testing (reference the test_plan)
#      - Any authentication details or configuration needed
#      - Specific test scenarios to focus on
#      - Any known issues or edge cases to verify
#
# 5. Call the testing agent with specific instructions referring to test_result.md
#
# IMPORTANT: Main agent must ALWAYS update test_result.md BEFORE calling the testing agent, as it relies on this file to understand what to test next.

#====================================================================================================
# END - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================



#====================================================================================================
# Testing Data - Main Agent and testing sub agent both should log testing data below this section
#====================================================================================================

user_problem_statement: |
  Sollmarine — премиум-сайт ресторана морепродуктов на Expo Web с темно-синей/морской/золотой палитрой.
  Секции: Hero, About, Menu, Delivery, Amenities, Gallery, Reviews, Contacts.
  Функционал: бронирование столика (DB + Telegram уведомление админу), доставка с корзиной (DB + Telegram уведомление).

backend:
  - task: "Reservations API (POST/GET /api/reservations)"
    implemented: true
    working: true
    file: "/app/backend/server.py"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: "NA"
          agent: "main"
          comment: "Создаёт бронь в MongoDB, валидирует guests 1..30, возвращает Reservation с UUID. После сохранения запускается background task с Telegram-уведомлением (gracefully skip если не сконфигурирован TELEGRAM_BOT_TOKEN/CHAT_ID)."
        - working: true
          agent: "testing"
          comment: "Tested via public EXPO_PUBLIC_BACKEND_URL. POST /api/reservations with valid payload (Иван, +79991234567, 4 guests, 2026-03-15 19:00) returned 200 in ~0.23s with a valid UUID id and UTC ISO created_at; all fields echoed correctly and record was persisted in MongoDB. Validation working: guests=0 → 422, guests=31 → 422, missing phone → 422. GET /api/reservations returned a 200 list sorted latest-first (newly created reservation at index 0). No hang from background task — response time <1s."

  - task: "Orders API (POST/GET /api/orders)"
    implemented: true
    working: true
    file: "/app/backend/server.py"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: "NA"
          agent: "main"
          comment: "Создаёт заказ в MongoDB, отвергает пустую корзину (400). Запускается background task с Telegram-уведомлением о новом заказе."
        - working: true
          agent: "testing"
          comment: "POST /api/orders with valid payload (Анна, 1 item Устрицы ×2 = 4980₽) returned 200 with UUID id, items array preserved, total correct, created_at ISO UTC. Empty items [] correctly rejected with 400 and detail 'Cart is empty'. GET /api/orders returned 200 list sorted latest-first with our new order at index 0. No exceptions in backend logs."

  - task: "Telegram notifications integration"
    implemented: true
    working: true
    file: "/app/backend/server.py"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: "NA"
          agent: "main"
          comment: "Реализована через httpx async POST к Telegram Bot API (sendMessage, parse_mode=HTML). Без креденшелов — silent skip с info-логом. Эндпоинт /api/telegram/test для проверки."
        - working: true
          agent: "testing"
          comment: "GET /api/ correctly returns {service:'Sollmarine API', status:'ok', telegram_configured:false}. POST /api/telegram/test without TELEGRAM_BOT_TOKEN/CHAT_ID returns 400 with detail 'Telegram is not configured'. Background notifications for reservations/orders silently skip — backend.err.log shows two 'Telegram not configured — skipping notification' INFO lines, no tracebacks or ERROR entries. Fire-and-forget background task does not delay HTTP response."

frontend:
  - task: "Single-page premium website (Expo Web) with all sections"
    implemented: true
    working: "NA"
    file: "/app/frontend/app/index.tsx"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: "NA"
          agent: "main"
          comment: "Hero, About, Menu (8 категорий, табы), Delivery (теги+CTA+WhatsApp), Amenities, Gallery, Reviews, Contacts (с встроенной картой Yandex), Footer. Адаптивно для мобилы (исправлен header crowding)."

  - task: "Reservation modal with form -> POST /api/reservations"
    implemented: true
    working: "NA"
    file: "/app/frontend/app/index.tsx"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: "NA"
          agent: "main"
          comment: "Modal с полями имя/телефон/email/гостей/время/дата/комментарий. На вебе используется нативный <input type=date> и <input type=time>. После успеха показывает 'Спасибо' экран."

  - task: "Cart modal with full delivery checkout -> POST /api/orders"
    implemented: true
    working: "NA"
    file: "/app/frontend/app/index.tsx"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: "NA"
          agent: "main"
          comment: "Корзина с qty +/-, удалением, итогом, формой имя/телефон/адрес/комментарий. После заказа показывает 'Заказ принят'."

metadata:
  created_by: "main_agent"
  version: "1.0"
  test_sequence: 1
  run_ui: false

test_plan:
  current_focus: []
  stuck_tasks: []
  test_all: false
  test_priority: "high_first"

agent_communication:
    - agent: "main"
      message: "Бэкенд готов. Telegram-уведомления через background tasks (silent skip если ENV не задан). Прошу протестировать: 1) POST /api/reservations с валидным телом — должен вернуть 200 и сохранить в БД; 2) POST /api/reservations с guests=0 или 31 — должен вернуть 422 валидационную ошибку; 3) GET /api/reservations — должен вернуть список (последняя бронь — первая); 4) POST /api/orders с пустыми items — должен вернуть 400 'Cart is empty'; 5) POST /api/orders с корректным телом — 200 и сохранение; 6) GET /api/orders — список; 7) GET /api/ — должен вернуть {service, status:ok, telegram_configured:false}; 8) POST /api/telegram/test без креденшелов — должен вернуть 400 'Telegram is not configured'. Логи бэкенда не должны содержать ошибок при skip Telegram."
    - agent: "testing"
      message: "Backend testing complete — all 11 test cases PASS against the public EXPO_PUBLIC_BACKEND_URL (https://sollmarine-booking.preview.emergentagent.com/api). Created /app/backend_test.py with full coverage: GET /api/ health check (returns expected payload with telegram_configured:false), POST /api/reservations (valid Russian payload succeeds with UUID + UTC ISO created_at in ~0.23s; validation: guests=0→422, guests=31→422, missing phone→422), GET /api/reservations (200 list, latest-first ordering verified), POST /api/orders (valid payload with Устрицы item succeeds), POST /api/orders empty items [] → 400 with detail 'Cart is empty', GET /api/orders (200 list), POST /api/telegram/test → 400 'Telegram is not configured'. Backend logs show only INFO 'Telegram not configured — skipping notification' entries (no tracebacks, no ERROR lines). MongoDB persistence confirmed. BackgroundTasks do not block HTTP responses. No action needed from main agent."
